import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import Router from "next/router";
import {
  dedupExchange,
  Exchange,
  fetchExchange
} from "urql";
import { pipe, tap } from "wonka";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation
} from "../generated/graphql";
import { isServer } from "../util/isServer";
import { updateQueryWrapper } from "./updateQueryWrapper";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        Router.replace("/login");
      }
    })
  );
};

function invalidateAllNotes(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "notes");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "notes", fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: process.env.NEXT_PUBLIC_DEFAULT_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            login: (_result, args, cache, info) => {
              updateQueryWrapper<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    invalidateAllNotes(cache);
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            createNote: (_result, args, cache, info) => {
              invalidateAllNotes(cache);
            },
            register: (_result, args, cache, info) => {
              updateQueryWrapper<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    invalidateAllNotes(cache);
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
            logout: (_result, args, cache, info) => {
              invalidateAllNotes(cache);
              updateQueryWrapper<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
