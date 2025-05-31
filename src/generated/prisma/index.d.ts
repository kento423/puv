
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Pokemon
 * 
 */
export type Pokemon = $Result.DefaultSelection<Prisma.$PokemonPayload>
/**
 * Model Stat
 * 
 */
export type Stat = $Result.DefaultSelection<Prisma.$StatPayload>
/**
 * Model PokemonStat
 * 
 */
export type PokemonStat = $Result.DefaultSelection<Prisma.$PokemonStatPayload>
/**
 * Model PokemonCounter
 * 
 */
export type PokemonCounter = $Result.DefaultSelection<Prisma.$PokemonCounterPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pokemon
 * const pokemon = await prisma.pokemon.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pokemon
   * const pokemon = await prisma.pokemon.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pokemon`: Exposes CRUD operations for the **Pokemon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pokemon
    * const pokemon = await prisma.pokemon.findMany()
    * ```
    */
  get pokemon(): Prisma.PokemonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stat`: Exposes CRUD operations for the **Stat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stats
    * const stats = await prisma.stat.findMany()
    * ```
    */
  get stat(): Prisma.StatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pokemonStat`: Exposes CRUD operations for the **PokemonStat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PokemonStats
    * const pokemonStats = await prisma.pokemonStat.findMany()
    * ```
    */
  get pokemonStat(): Prisma.PokemonStatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pokemonCounter`: Exposes CRUD operations for the **PokemonCounter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PokemonCounters
    * const pokemonCounters = await prisma.pokemonCounter.findMany()
    * ```
    */
  get pokemonCounter(): Prisma.PokemonCounterDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Pokemon: 'Pokemon',
    Stat: 'Stat',
    PokemonStat: 'PokemonStat',
    PokemonCounter: 'PokemonCounter'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pokemon" | "stat" | "pokemonStat" | "pokemonCounter"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Pokemon: {
        payload: Prisma.$PokemonPayload<ExtArgs>
        fields: Prisma.PokemonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PokemonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PokemonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload>
          }
          findFirst: {
            args: Prisma.PokemonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PokemonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload>
          }
          findMany: {
            args: Prisma.PokemonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload>[]
          }
          create: {
            args: Prisma.PokemonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload>
          }
          createMany: {
            args: Prisma.PokemonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PokemonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload>
          }
          update: {
            args: Prisma.PokemonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload>
          }
          deleteMany: {
            args: Prisma.PokemonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PokemonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PokemonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonPayload>
          }
          aggregate: {
            args: Prisma.PokemonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePokemon>
          }
          groupBy: {
            args: Prisma.PokemonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PokemonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PokemonCountArgs<ExtArgs>
            result: $Utils.Optional<PokemonCountAggregateOutputType> | number
          }
        }
      }
      Stat: {
        payload: Prisma.$StatPayload<ExtArgs>
        fields: Prisma.StatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload>
          }
          findFirst: {
            args: Prisma.StatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload>
          }
          findMany: {
            args: Prisma.StatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload>[]
          }
          create: {
            args: Prisma.StatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload>
          }
          createMany: {
            args: Prisma.StatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload>
          }
          update: {
            args: Prisma.StatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload>
          }
          deleteMany: {
            args: Prisma.StatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatPayload>
          }
          aggregate: {
            args: Prisma.StatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStat>
          }
          groupBy: {
            args: Prisma.StatGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatCountArgs<ExtArgs>
            result: $Utils.Optional<StatCountAggregateOutputType> | number
          }
        }
      }
      PokemonStat: {
        payload: Prisma.$PokemonStatPayload<ExtArgs>
        fields: Prisma.PokemonStatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PokemonStatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PokemonStatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload>
          }
          findFirst: {
            args: Prisma.PokemonStatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PokemonStatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload>
          }
          findMany: {
            args: Prisma.PokemonStatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload>[]
          }
          create: {
            args: Prisma.PokemonStatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload>
          }
          createMany: {
            args: Prisma.PokemonStatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PokemonStatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload>
          }
          update: {
            args: Prisma.PokemonStatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload>
          }
          deleteMany: {
            args: Prisma.PokemonStatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PokemonStatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PokemonStatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonStatPayload>
          }
          aggregate: {
            args: Prisma.PokemonStatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePokemonStat>
          }
          groupBy: {
            args: Prisma.PokemonStatGroupByArgs<ExtArgs>
            result: $Utils.Optional<PokemonStatGroupByOutputType>[]
          }
          count: {
            args: Prisma.PokemonStatCountArgs<ExtArgs>
            result: $Utils.Optional<PokemonStatCountAggregateOutputType> | number
          }
        }
      }
      PokemonCounter: {
        payload: Prisma.$PokemonCounterPayload<ExtArgs>
        fields: Prisma.PokemonCounterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PokemonCounterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PokemonCounterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload>
          }
          findFirst: {
            args: Prisma.PokemonCounterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PokemonCounterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload>
          }
          findMany: {
            args: Prisma.PokemonCounterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload>[]
          }
          create: {
            args: Prisma.PokemonCounterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload>
          }
          createMany: {
            args: Prisma.PokemonCounterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PokemonCounterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload>
          }
          update: {
            args: Prisma.PokemonCounterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload>
          }
          deleteMany: {
            args: Prisma.PokemonCounterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PokemonCounterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PokemonCounterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokemonCounterPayload>
          }
          aggregate: {
            args: Prisma.PokemonCounterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePokemonCounter>
          }
          groupBy: {
            args: Prisma.PokemonCounterGroupByArgs<ExtArgs>
            result: $Utils.Optional<PokemonCounterGroupByOutputType>[]
          }
          count: {
            args: Prisma.PokemonCounterCountArgs<ExtArgs>
            result: $Utils.Optional<PokemonCounterCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    pokemon?: PokemonOmit
    stat?: StatOmit
    pokemonStat?: PokemonStatOmit
    pokemonCounter?: PokemonCounterOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PokemonCountOutputType
   */

  export type PokemonCountOutputType = {
    stats: number
    targetOf: number
    counterFor: number
  }

  export type PokemonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | PokemonCountOutputTypeCountStatsArgs
    targetOf?: boolean | PokemonCountOutputTypeCountTargetOfArgs
    counterFor?: boolean | PokemonCountOutputTypeCountCounterForArgs
  }

  // Custom InputTypes
  /**
   * PokemonCountOutputType without action
   */
  export type PokemonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCountOutputType
     */
    select?: PokemonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PokemonCountOutputType without action
   */
  export type PokemonCountOutputTypeCountStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokemonStatWhereInput
  }

  /**
   * PokemonCountOutputType without action
   */
  export type PokemonCountOutputTypeCountTargetOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokemonCounterWhereInput
  }

  /**
   * PokemonCountOutputType without action
   */
  export type PokemonCountOutputTypeCountCounterForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokemonCounterWhereInput
  }


  /**
   * Count Type StatCountOutputType
   */

  export type StatCountOutputType = {
    pokemonStats: number
  }

  export type StatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pokemonStats?: boolean | StatCountOutputTypeCountPokemonStatsArgs
  }

  // Custom InputTypes
  /**
   * StatCountOutputType without action
   */
  export type StatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatCountOutputType
     */
    select?: StatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StatCountOutputType without action
   */
  export type StatCountOutputTypeCountPokemonStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokemonStatWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Pokemon
   */

  export type AggregatePokemon = {
    _count: PokemonCountAggregateOutputType | null
    _avg: PokemonAvgAggregateOutputType | null
    _sum: PokemonSumAggregateOutputType | null
    _min: PokemonMinAggregateOutputType | null
    _max: PokemonMaxAggregateOutputType | null
  }

  export type PokemonAvgAggregateOutputType = {
    id: number | null
  }

  export type PokemonSumAggregateOutputType = {
    id: number | null
  }

  export type PokemonMinAggregateOutputType = {
    id: number | null
    slug: string | null
    nameJa: string | null
    nameEn: string | null
    damageClass: string | null
    rangeType: string | null
    battleStyle: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PokemonMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    nameJa: string | null
    nameEn: string | null
    damageClass: string | null
    rangeType: string | null
    battleStyle: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PokemonCountAggregateOutputType = {
    id: number
    slug: number
    nameJa: number
    nameEn: number
    damageClass: number
    rangeType: number
    battleStyle: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PokemonAvgAggregateInputType = {
    id?: true
  }

  export type PokemonSumAggregateInputType = {
    id?: true
  }

  export type PokemonMinAggregateInputType = {
    id?: true
    slug?: true
    nameJa?: true
    nameEn?: true
    damageClass?: true
    rangeType?: true
    battleStyle?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PokemonMaxAggregateInputType = {
    id?: true
    slug?: true
    nameJa?: true
    nameEn?: true
    damageClass?: true
    rangeType?: true
    battleStyle?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PokemonCountAggregateInputType = {
    id?: true
    slug?: true
    nameJa?: true
    nameEn?: true
    damageClass?: true
    rangeType?: true
    battleStyle?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PokemonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pokemon to aggregate.
     */
    where?: PokemonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pokemon to fetch.
     */
    orderBy?: PokemonOrderByWithRelationInput | PokemonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PokemonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pokemon from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pokemon.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pokemon
    **/
    _count?: true | PokemonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PokemonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PokemonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PokemonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PokemonMaxAggregateInputType
  }

  export type GetPokemonAggregateType<T extends PokemonAggregateArgs> = {
        [P in keyof T & keyof AggregatePokemon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePokemon[P]>
      : GetScalarType<T[P], AggregatePokemon[P]>
  }




  export type PokemonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokemonWhereInput
    orderBy?: PokemonOrderByWithAggregationInput | PokemonOrderByWithAggregationInput[]
    by: PokemonScalarFieldEnum[] | PokemonScalarFieldEnum
    having?: PokemonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PokemonCountAggregateInputType | true
    _avg?: PokemonAvgAggregateInputType
    _sum?: PokemonSumAggregateInputType
    _min?: PokemonMinAggregateInputType
    _max?: PokemonMaxAggregateInputType
  }

  export type PokemonGroupByOutputType = {
    id: number
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: PokemonCountAggregateOutputType | null
    _avg: PokemonAvgAggregateOutputType | null
    _sum: PokemonSumAggregateOutputType | null
    _min: PokemonMinAggregateOutputType | null
    _max: PokemonMaxAggregateOutputType | null
  }

  type GetPokemonGroupByPayload<T extends PokemonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PokemonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PokemonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PokemonGroupByOutputType[P]>
            : GetScalarType<T[P], PokemonGroupByOutputType[P]>
        }
      >
    >


  export type PokemonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    nameJa?: boolean
    nameEn?: boolean
    damageClass?: boolean
    rangeType?: boolean
    battleStyle?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stats?: boolean | Pokemon$statsArgs<ExtArgs>
    targetOf?: boolean | Pokemon$targetOfArgs<ExtArgs>
    counterFor?: boolean | Pokemon$counterForArgs<ExtArgs>
    _count?: boolean | PokemonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pokemon"]>



  export type PokemonSelectScalar = {
    id?: boolean
    slug?: boolean
    nameJa?: boolean
    nameEn?: boolean
    damageClass?: boolean
    rangeType?: boolean
    battleStyle?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PokemonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "nameJa" | "nameEn" | "damageClass" | "rangeType" | "battleStyle" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["pokemon"]>
  export type PokemonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | Pokemon$statsArgs<ExtArgs>
    targetOf?: boolean | Pokemon$targetOfArgs<ExtArgs>
    counterFor?: boolean | Pokemon$counterForArgs<ExtArgs>
    _count?: boolean | PokemonCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PokemonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pokemon"
    objects: {
      stats: Prisma.$PokemonStatPayload<ExtArgs>[]
      targetOf: Prisma.$PokemonCounterPayload<ExtArgs>[]
      counterFor: Prisma.$PokemonCounterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      nameJa: string
      nameEn: string
      damageClass: string
      rangeType: string
      battleStyle: string
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pokemon"]>
    composites: {}
  }

  type PokemonGetPayload<S extends boolean | null | undefined | PokemonDefaultArgs> = $Result.GetResult<Prisma.$PokemonPayload, S>

  type PokemonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PokemonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PokemonCountAggregateInputType | true
    }

  export interface PokemonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pokemon'], meta: { name: 'Pokemon' } }
    /**
     * Find zero or one Pokemon that matches the filter.
     * @param {PokemonFindUniqueArgs} args - Arguments to find a Pokemon
     * @example
     * // Get one Pokemon
     * const pokemon = await prisma.pokemon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PokemonFindUniqueArgs>(args: SelectSubset<T, PokemonFindUniqueArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pokemon that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PokemonFindUniqueOrThrowArgs} args - Arguments to find a Pokemon
     * @example
     * // Get one Pokemon
     * const pokemon = await prisma.pokemon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PokemonFindUniqueOrThrowArgs>(args: SelectSubset<T, PokemonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pokemon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonFindFirstArgs} args - Arguments to find a Pokemon
     * @example
     * // Get one Pokemon
     * const pokemon = await prisma.pokemon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PokemonFindFirstArgs>(args?: SelectSubset<T, PokemonFindFirstArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pokemon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonFindFirstOrThrowArgs} args - Arguments to find a Pokemon
     * @example
     * // Get one Pokemon
     * const pokemon = await prisma.pokemon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PokemonFindFirstOrThrowArgs>(args?: SelectSubset<T, PokemonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pokemon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pokemon
     * const pokemon = await prisma.pokemon.findMany()
     * 
     * // Get first 10 Pokemon
     * const pokemon = await prisma.pokemon.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pokemonWithIdOnly = await prisma.pokemon.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PokemonFindManyArgs>(args?: SelectSubset<T, PokemonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pokemon.
     * @param {PokemonCreateArgs} args - Arguments to create a Pokemon.
     * @example
     * // Create one Pokemon
     * const Pokemon = await prisma.pokemon.create({
     *   data: {
     *     // ... data to create a Pokemon
     *   }
     * })
     * 
     */
    create<T extends PokemonCreateArgs>(args: SelectSubset<T, PokemonCreateArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pokemon.
     * @param {PokemonCreateManyArgs} args - Arguments to create many Pokemon.
     * @example
     * // Create many Pokemon
     * const pokemon = await prisma.pokemon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PokemonCreateManyArgs>(args?: SelectSubset<T, PokemonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pokemon.
     * @param {PokemonDeleteArgs} args - Arguments to delete one Pokemon.
     * @example
     * // Delete one Pokemon
     * const Pokemon = await prisma.pokemon.delete({
     *   where: {
     *     // ... filter to delete one Pokemon
     *   }
     * })
     * 
     */
    delete<T extends PokemonDeleteArgs>(args: SelectSubset<T, PokemonDeleteArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pokemon.
     * @param {PokemonUpdateArgs} args - Arguments to update one Pokemon.
     * @example
     * // Update one Pokemon
     * const pokemon = await prisma.pokemon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PokemonUpdateArgs>(args: SelectSubset<T, PokemonUpdateArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pokemon.
     * @param {PokemonDeleteManyArgs} args - Arguments to filter Pokemon to delete.
     * @example
     * // Delete a few Pokemon
     * const { count } = await prisma.pokemon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PokemonDeleteManyArgs>(args?: SelectSubset<T, PokemonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pokemon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pokemon
     * const pokemon = await prisma.pokemon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PokemonUpdateManyArgs>(args: SelectSubset<T, PokemonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pokemon.
     * @param {PokemonUpsertArgs} args - Arguments to update or create a Pokemon.
     * @example
     * // Update or create a Pokemon
     * const pokemon = await prisma.pokemon.upsert({
     *   create: {
     *     // ... data to create a Pokemon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pokemon we want to update
     *   }
     * })
     */
    upsert<T extends PokemonUpsertArgs>(args: SelectSubset<T, PokemonUpsertArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pokemon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCountArgs} args - Arguments to filter Pokemon to count.
     * @example
     * // Count the number of Pokemon
     * const count = await prisma.pokemon.count({
     *   where: {
     *     // ... the filter for the Pokemon we want to count
     *   }
     * })
    **/
    count<T extends PokemonCountArgs>(
      args?: Subset<T, PokemonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PokemonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pokemon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PokemonAggregateArgs>(args: Subset<T, PokemonAggregateArgs>): Prisma.PrismaPromise<GetPokemonAggregateType<T>>

    /**
     * Group by Pokemon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PokemonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PokemonGroupByArgs['orderBy'] }
        : { orderBy?: PokemonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PokemonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPokemonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pokemon model
   */
  readonly fields: PokemonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pokemon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PokemonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stats<T extends Pokemon$statsArgs<ExtArgs> = {}>(args?: Subset<T, Pokemon$statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    targetOf<T extends Pokemon$targetOfArgs<ExtArgs> = {}>(args?: Subset<T, Pokemon$targetOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    counterFor<T extends Pokemon$counterForArgs<ExtArgs> = {}>(args?: Subset<T, Pokemon$counterForArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pokemon model
   */
  interface PokemonFieldRefs {
    readonly id: FieldRef<"Pokemon", 'Int'>
    readonly slug: FieldRef<"Pokemon", 'String'>
    readonly nameJa: FieldRef<"Pokemon", 'String'>
    readonly nameEn: FieldRef<"Pokemon", 'String'>
    readonly damageClass: FieldRef<"Pokemon", 'String'>
    readonly rangeType: FieldRef<"Pokemon", 'String'>
    readonly battleStyle: FieldRef<"Pokemon", 'String'>
    readonly imageUrl: FieldRef<"Pokemon", 'String'>
    readonly createdAt: FieldRef<"Pokemon", 'DateTime'>
    readonly updatedAt: FieldRef<"Pokemon", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pokemon findUnique
   */
  export type PokemonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * Filter, which Pokemon to fetch.
     */
    where: PokemonWhereUniqueInput
  }

  /**
   * Pokemon findUniqueOrThrow
   */
  export type PokemonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * Filter, which Pokemon to fetch.
     */
    where: PokemonWhereUniqueInput
  }

  /**
   * Pokemon findFirst
   */
  export type PokemonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * Filter, which Pokemon to fetch.
     */
    where?: PokemonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pokemon to fetch.
     */
    orderBy?: PokemonOrderByWithRelationInput | PokemonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pokemon.
     */
    cursor?: PokemonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pokemon from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pokemon.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pokemon.
     */
    distinct?: PokemonScalarFieldEnum | PokemonScalarFieldEnum[]
  }

  /**
   * Pokemon findFirstOrThrow
   */
  export type PokemonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * Filter, which Pokemon to fetch.
     */
    where?: PokemonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pokemon to fetch.
     */
    orderBy?: PokemonOrderByWithRelationInput | PokemonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pokemon.
     */
    cursor?: PokemonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pokemon from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pokemon.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pokemon.
     */
    distinct?: PokemonScalarFieldEnum | PokemonScalarFieldEnum[]
  }

  /**
   * Pokemon findMany
   */
  export type PokemonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * Filter, which Pokemon to fetch.
     */
    where?: PokemonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pokemon to fetch.
     */
    orderBy?: PokemonOrderByWithRelationInput | PokemonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pokemon.
     */
    cursor?: PokemonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pokemon from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pokemon.
     */
    skip?: number
    distinct?: PokemonScalarFieldEnum | PokemonScalarFieldEnum[]
  }

  /**
   * Pokemon create
   */
  export type PokemonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * The data needed to create a Pokemon.
     */
    data: XOR<PokemonCreateInput, PokemonUncheckedCreateInput>
  }

  /**
   * Pokemon createMany
   */
  export type PokemonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pokemon.
     */
    data: PokemonCreateManyInput | PokemonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pokemon update
   */
  export type PokemonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * The data needed to update a Pokemon.
     */
    data: XOR<PokemonUpdateInput, PokemonUncheckedUpdateInput>
    /**
     * Choose, which Pokemon to update.
     */
    where: PokemonWhereUniqueInput
  }

  /**
   * Pokemon updateMany
   */
  export type PokemonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pokemon.
     */
    data: XOR<PokemonUpdateManyMutationInput, PokemonUncheckedUpdateManyInput>
    /**
     * Filter which Pokemon to update
     */
    where?: PokemonWhereInput
    /**
     * Limit how many Pokemon to update.
     */
    limit?: number
  }

  /**
   * Pokemon upsert
   */
  export type PokemonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * The filter to search for the Pokemon to update in case it exists.
     */
    where: PokemonWhereUniqueInput
    /**
     * In case the Pokemon found by the `where` argument doesn't exist, create a new Pokemon with this data.
     */
    create: XOR<PokemonCreateInput, PokemonUncheckedCreateInput>
    /**
     * In case the Pokemon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PokemonUpdateInput, PokemonUncheckedUpdateInput>
  }

  /**
   * Pokemon delete
   */
  export type PokemonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
    /**
     * Filter which Pokemon to delete.
     */
    where: PokemonWhereUniqueInput
  }

  /**
   * Pokemon deleteMany
   */
  export type PokemonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pokemon to delete
     */
    where?: PokemonWhereInput
    /**
     * Limit how many Pokemon to delete.
     */
    limit?: number
  }

  /**
   * Pokemon.stats
   */
  export type Pokemon$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    where?: PokemonStatWhereInput
    orderBy?: PokemonStatOrderByWithRelationInput | PokemonStatOrderByWithRelationInput[]
    cursor?: PokemonStatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PokemonStatScalarFieldEnum | PokemonStatScalarFieldEnum[]
  }

  /**
   * Pokemon.targetOf
   */
  export type Pokemon$targetOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    where?: PokemonCounterWhereInput
    orderBy?: PokemonCounterOrderByWithRelationInput | PokemonCounterOrderByWithRelationInput[]
    cursor?: PokemonCounterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PokemonCounterScalarFieldEnum | PokemonCounterScalarFieldEnum[]
  }

  /**
   * Pokemon.counterFor
   */
  export type Pokemon$counterForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    where?: PokemonCounterWhereInput
    orderBy?: PokemonCounterOrderByWithRelationInput | PokemonCounterOrderByWithRelationInput[]
    cursor?: PokemonCounterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PokemonCounterScalarFieldEnum | PokemonCounterScalarFieldEnum[]
  }

  /**
   * Pokemon without action
   */
  export type PokemonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pokemon
     */
    select?: PokemonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pokemon
     */
    omit?: PokemonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonInclude<ExtArgs> | null
  }


  /**
   * Model Stat
   */

  export type AggregateStat = {
    _count: StatCountAggregateOutputType | null
    _avg: StatAvgAggregateOutputType | null
    _sum: StatSumAggregateOutputType | null
    _min: StatMinAggregateOutputType | null
    _max: StatMaxAggregateOutputType | null
  }

  export type StatAvgAggregateOutputType = {
    id: number | null
  }

  export type StatSumAggregateOutputType = {
    id: number | null
  }

  export type StatMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type StatMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type StatCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type StatAvgAggregateInputType = {
    id?: true
  }

  export type StatSumAggregateInputType = {
    id?: true
  }

  export type StatMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type StatMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type StatCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type StatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stat to aggregate.
     */
    where?: StatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stats to fetch.
     */
    orderBy?: StatOrderByWithRelationInput | StatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stats
    **/
    _count?: true | StatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatMaxAggregateInputType
  }

  export type GetStatAggregateType<T extends StatAggregateArgs> = {
        [P in keyof T & keyof AggregateStat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStat[P]>
      : GetScalarType<T[P], AggregateStat[P]>
  }




  export type StatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatWhereInput
    orderBy?: StatOrderByWithAggregationInput | StatOrderByWithAggregationInput[]
    by: StatScalarFieldEnum[] | StatScalarFieldEnum
    having?: StatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatCountAggregateInputType | true
    _avg?: StatAvgAggregateInputType
    _sum?: StatSumAggregateInputType
    _min?: StatMinAggregateInputType
    _max?: StatMaxAggregateInputType
  }

  export type StatGroupByOutputType = {
    id: number
    name: string
    _count: StatCountAggregateOutputType | null
    _avg: StatAvgAggregateOutputType | null
    _sum: StatSumAggregateOutputType | null
    _min: StatMinAggregateOutputType | null
    _max: StatMaxAggregateOutputType | null
  }

  type GetStatGroupByPayload<T extends StatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatGroupByOutputType[P]>
            : GetScalarType<T[P], StatGroupByOutputType[P]>
        }
      >
    >


  export type StatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    pokemonStats?: boolean | Stat$pokemonStatsArgs<ExtArgs>
    _count?: boolean | StatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stat"]>



  export type StatSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type StatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["stat"]>
  export type StatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pokemonStats?: boolean | Stat$pokemonStatsArgs<ExtArgs>
    _count?: boolean | StatCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $StatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stat"
    objects: {
      pokemonStats: Prisma.$PokemonStatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["stat"]>
    composites: {}
  }

  type StatGetPayload<S extends boolean | null | undefined | StatDefaultArgs> = $Result.GetResult<Prisma.$StatPayload, S>

  type StatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StatCountAggregateInputType | true
    }

  export interface StatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stat'], meta: { name: 'Stat' } }
    /**
     * Find zero or one Stat that matches the filter.
     * @param {StatFindUniqueArgs} args - Arguments to find a Stat
     * @example
     * // Get one Stat
     * const stat = await prisma.stat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatFindUniqueArgs>(args: SelectSubset<T, StatFindUniqueArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatFindUniqueOrThrowArgs} args - Arguments to find a Stat
     * @example
     * // Get one Stat
     * const stat = await prisma.stat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatFindUniqueOrThrowArgs>(args: SelectSubset<T, StatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatFindFirstArgs} args - Arguments to find a Stat
     * @example
     * // Get one Stat
     * const stat = await prisma.stat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatFindFirstArgs>(args?: SelectSubset<T, StatFindFirstArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatFindFirstOrThrowArgs} args - Arguments to find a Stat
     * @example
     * // Get one Stat
     * const stat = await prisma.stat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatFindFirstOrThrowArgs>(args?: SelectSubset<T, StatFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stats
     * const stats = await prisma.stat.findMany()
     * 
     * // Get first 10 Stats
     * const stats = await prisma.stat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statWithIdOnly = await prisma.stat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatFindManyArgs>(args?: SelectSubset<T, StatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stat.
     * @param {StatCreateArgs} args - Arguments to create a Stat.
     * @example
     * // Create one Stat
     * const Stat = await prisma.stat.create({
     *   data: {
     *     // ... data to create a Stat
     *   }
     * })
     * 
     */
    create<T extends StatCreateArgs>(args: SelectSubset<T, StatCreateArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stats.
     * @param {StatCreateManyArgs} args - Arguments to create many Stats.
     * @example
     * // Create many Stats
     * const stat = await prisma.stat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatCreateManyArgs>(args?: SelectSubset<T, StatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Stat.
     * @param {StatDeleteArgs} args - Arguments to delete one Stat.
     * @example
     * // Delete one Stat
     * const Stat = await prisma.stat.delete({
     *   where: {
     *     // ... filter to delete one Stat
     *   }
     * })
     * 
     */
    delete<T extends StatDeleteArgs>(args: SelectSubset<T, StatDeleteArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stat.
     * @param {StatUpdateArgs} args - Arguments to update one Stat.
     * @example
     * // Update one Stat
     * const stat = await prisma.stat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatUpdateArgs>(args: SelectSubset<T, StatUpdateArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stats.
     * @param {StatDeleteManyArgs} args - Arguments to filter Stats to delete.
     * @example
     * // Delete a few Stats
     * const { count } = await prisma.stat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatDeleteManyArgs>(args?: SelectSubset<T, StatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stats
     * const stat = await prisma.stat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatUpdateManyArgs>(args: SelectSubset<T, StatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Stat.
     * @param {StatUpsertArgs} args - Arguments to update or create a Stat.
     * @example
     * // Update or create a Stat
     * const stat = await prisma.stat.upsert({
     *   create: {
     *     // ... data to create a Stat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stat we want to update
     *   }
     * })
     */
    upsert<T extends StatUpsertArgs>(args: SelectSubset<T, StatUpsertArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatCountArgs} args - Arguments to filter Stats to count.
     * @example
     * // Count the number of Stats
     * const count = await prisma.stat.count({
     *   where: {
     *     // ... the filter for the Stats we want to count
     *   }
     * })
    **/
    count<T extends StatCountArgs>(
      args?: Subset<T, StatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatAggregateArgs>(args: Subset<T, StatAggregateArgs>): Prisma.PrismaPromise<GetStatAggregateType<T>>

    /**
     * Group by Stat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatGroupByArgs['orderBy'] }
        : { orderBy?: StatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stat model
   */
  readonly fields: StatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pokemonStats<T extends Stat$pokemonStatsArgs<ExtArgs> = {}>(args?: Subset<T, Stat$pokemonStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stat model
   */
  interface StatFieldRefs {
    readonly id: FieldRef<"Stat", 'Int'>
    readonly name: FieldRef<"Stat", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Stat findUnique
   */
  export type StatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * Filter, which Stat to fetch.
     */
    where: StatWhereUniqueInput
  }

  /**
   * Stat findUniqueOrThrow
   */
  export type StatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * Filter, which Stat to fetch.
     */
    where: StatWhereUniqueInput
  }

  /**
   * Stat findFirst
   */
  export type StatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * Filter, which Stat to fetch.
     */
    where?: StatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stats to fetch.
     */
    orderBy?: StatOrderByWithRelationInput | StatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stats.
     */
    cursor?: StatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stats.
     */
    distinct?: StatScalarFieldEnum | StatScalarFieldEnum[]
  }

  /**
   * Stat findFirstOrThrow
   */
  export type StatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * Filter, which Stat to fetch.
     */
    where?: StatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stats to fetch.
     */
    orderBy?: StatOrderByWithRelationInput | StatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stats.
     */
    cursor?: StatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stats.
     */
    distinct?: StatScalarFieldEnum | StatScalarFieldEnum[]
  }

  /**
   * Stat findMany
   */
  export type StatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * Filter, which Stats to fetch.
     */
    where?: StatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stats to fetch.
     */
    orderBy?: StatOrderByWithRelationInput | StatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stats.
     */
    cursor?: StatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stats.
     */
    skip?: number
    distinct?: StatScalarFieldEnum | StatScalarFieldEnum[]
  }

  /**
   * Stat create
   */
  export type StatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * The data needed to create a Stat.
     */
    data: XOR<StatCreateInput, StatUncheckedCreateInput>
  }

  /**
   * Stat createMany
   */
  export type StatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stats.
     */
    data: StatCreateManyInput | StatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stat update
   */
  export type StatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * The data needed to update a Stat.
     */
    data: XOR<StatUpdateInput, StatUncheckedUpdateInput>
    /**
     * Choose, which Stat to update.
     */
    where: StatWhereUniqueInput
  }

  /**
   * Stat updateMany
   */
  export type StatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stats.
     */
    data: XOR<StatUpdateManyMutationInput, StatUncheckedUpdateManyInput>
    /**
     * Filter which Stats to update
     */
    where?: StatWhereInput
    /**
     * Limit how many Stats to update.
     */
    limit?: number
  }

  /**
   * Stat upsert
   */
  export type StatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * The filter to search for the Stat to update in case it exists.
     */
    where: StatWhereUniqueInput
    /**
     * In case the Stat found by the `where` argument doesn't exist, create a new Stat with this data.
     */
    create: XOR<StatCreateInput, StatUncheckedCreateInput>
    /**
     * In case the Stat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatUpdateInput, StatUncheckedUpdateInput>
  }

  /**
   * Stat delete
   */
  export type StatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
    /**
     * Filter which Stat to delete.
     */
    where: StatWhereUniqueInput
  }

  /**
   * Stat deleteMany
   */
  export type StatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stats to delete
     */
    where?: StatWhereInput
    /**
     * Limit how many Stats to delete.
     */
    limit?: number
  }

  /**
   * Stat.pokemonStats
   */
  export type Stat$pokemonStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    where?: PokemonStatWhereInput
    orderBy?: PokemonStatOrderByWithRelationInput | PokemonStatOrderByWithRelationInput[]
    cursor?: PokemonStatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PokemonStatScalarFieldEnum | PokemonStatScalarFieldEnum[]
  }

  /**
   * Stat without action
   */
  export type StatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stat
     */
    select?: StatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stat
     */
    omit?: StatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatInclude<ExtArgs> | null
  }


  /**
   * Model PokemonStat
   */

  export type AggregatePokemonStat = {
    _count: PokemonStatCountAggregateOutputType | null
    _avg: PokemonStatAvgAggregateOutputType | null
    _sum: PokemonStatSumAggregateOutputType | null
    _min: PokemonStatMinAggregateOutputType | null
    _max: PokemonStatMaxAggregateOutputType | null
  }

  export type PokemonStatAvgAggregateOutputType = {
    id: number | null
    pokemonId: number | null
    statId: number | null
    level: number | null
    value: number | null
  }

  export type PokemonStatSumAggregateOutputType = {
    id: number | null
    pokemonId: number | null
    statId: number | null
    level: number | null
    value: number | null
  }

  export type PokemonStatMinAggregateOutputType = {
    id: number | null
    pokemonId: number | null
    statId: number | null
    level: number | null
    value: number | null
  }

  export type PokemonStatMaxAggregateOutputType = {
    id: number | null
    pokemonId: number | null
    statId: number | null
    level: number | null
    value: number | null
  }

  export type PokemonStatCountAggregateOutputType = {
    id: number
    pokemonId: number
    statId: number
    level: number
    value: number
    _all: number
  }


  export type PokemonStatAvgAggregateInputType = {
    id?: true
    pokemonId?: true
    statId?: true
    level?: true
    value?: true
  }

  export type PokemonStatSumAggregateInputType = {
    id?: true
    pokemonId?: true
    statId?: true
    level?: true
    value?: true
  }

  export type PokemonStatMinAggregateInputType = {
    id?: true
    pokemonId?: true
    statId?: true
    level?: true
    value?: true
  }

  export type PokemonStatMaxAggregateInputType = {
    id?: true
    pokemonId?: true
    statId?: true
    level?: true
    value?: true
  }

  export type PokemonStatCountAggregateInputType = {
    id?: true
    pokemonId?: true
    statId?: true
    level?: true
    value?: true
    _all?: true
  }

  export type PokemonStatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokemonStat to aggregate.
     */
    where?: PokemonStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonStats to fetch.
     */
    orderBy?: PokemonStatOrderByWithRelationInput | PokemonStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PokemonStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PokemonStats
    **/
    _count?: true | PokemonStatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PokemonStatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PokemonStatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PokemonStatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PokemonStatMaxAggregateInputType
  }

  export type GetPokemonStatAggregateType<T extends PokemonStatAggregateArgs> = {
        [P in keyof T & keyof AggregatePokemonStat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePokemonStat[P]>
      : GetScalarType<T[P], AggregatePokemonStat[P]>
  }




  export type PokemonStatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokemonStatWhereInput
    orderBy?: PokemonStatOrderByWithAggregationInput | PokemonStatOrderByWithAggregationInput[]
    by: PokemonStatScalarFieldEnum[] | PokemonStatScalarFieldEnum
    having?: PokemonStatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PokemonStatCountAggregateInputType | true
    _avg?: PokemonStatAvgAggregateInputType
    _sum?: PokemonStatSumAggregateInputType
    _min?: PokemonStatMinAggregateInputType
    _max?: PokemonStatMaxAggregateInputType
  }

  export type PokemonStatGroupByOutputType = {
    id: number
    pokemonId: number
    statId: number
    level: number
    value: number
    _count: PokemonStatCountAggregateOutputType | null
    _avg: PokemonStatAvgAggregateOutputType | null
    _sum: PokemonStatSumAggregateOutputType | null
    _min: PokemonStatMinAggregateOutputType | null
    _max: PokemonStatMaxAggregateOutputType | null
  }

  type GetPokemonStatGroupByPayload<T extends PokemonStatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PokemonStatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PokemonStatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PokemonStatGroupByOutputType[P]>
            : GetScalarType<T[P], PokemonStatGroupByOutputType[P]>
        }
      >
    >


  export type PokemonStatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pokemonId?: boolean
    statId?: boolean
    level?: boolean
    value?: boolean
    pokemon?: boolean | PokemonDefaultArgs<ExtArgs>
    stat?: boolean | StatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pokemonStat"]>



  export type PokemonStatSelectScalar = {
    id?: boolean
    pokemonId?: boolean
    statId?: boolean
    level?: boolean
    value?: boolean
  }

  export type PokemonStatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pokemonId" | "statId" | "level" | "value", ExtArgs["result"]["pokemonStat"]>
  export type PokemonStatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pokemon?: boolean | PokemonDefaultArgs<ExtArgs>
    stat?: boolean | StatDefaultArgs<ExtArgs>
  }

  export type $PokemonStatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PokemonStat"
    objects: {
      pokemon: Prisma.$PokemonPayload<ExtArgs>
      stat: Prisma.$StatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pokemonId: number
      statId: number
      level: number
      value: number
    }, ExtArgs["result"]["pokemonStat"]>
    composites: {}
  }

  type PokemonStatGetPayload<S extends boolean | null | undefined | PokemonStatDefaultArgs> = $Result.GetResult<Prisma.$PokemonStatPayload, S>

  type PokemonStatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PokemonStatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PokemonStatCountAggregateInputType | true
    }

  export interface PokemonStatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PokemonStat'], meta: { name: 'PokemonStat' } }
    /**
     * Find zero or one PokemonStat that matches the filter.
     * @param {PokemonStatFindUniqueArgs} args - Arguments to find a PokemonStat
     * @example
     * // Get one PokemonStat
     * const pokemonStat = await prisma.pokemonStat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PokemonStatFindUniqueArgs>(args: SelectSubset<T, PokemonStatFindUniqueArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PokemonStat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PokemonStatFindUniqueOrThrowArgs} args - Arguments to find a PokemonStat
     * @example
     * // Get one PokemonStat
     * const pokemonStat = await prisma.pokemonStat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PokemonStatFindUniqueOrThrowArgs>(args: SelectSubset<T, PokemonStatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokemonStat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonStatFindFirstArgs} args - Arguments to find a PokemonStat
     * @example
     * // Get one PokemonStat
     * const pokemonStat = await prisma.pokemonStat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PokemonStatFindFirstArgs>(args?: SelectSubset<T, PokemonStatFindFirstArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokemonStat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonStatFindFirstOrThrowArgs} args - Arguments to find a PokemonStat
     * @example
     * // Get one PokemonStat
     * const pokemonStat = await prisma.pokemonStat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PokemonStatFindFirstOrThrowArgs>(args?: SelectSubset<T, PokemonStatFindFirstOrThrowArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PokemonStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonStatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PokemonStats
     * const pokemonStats = await prisma.pokemonStat.findMany()
     * 
     * // Get first 10 PokemonStats
     * const pokemonStats = await prisma.pokemonStat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pokemonStatWithIdOnly = await prisma.pokemonStat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PokemonStatFindManyArgs>(args?: SelectSubset<T, PokemonStatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PokemonStat.
     * @param {PokemonStatCreateArgs} args - Arguments to create a PokemonStat.
     * @example
     * // Create one PokemonStat
     * const PokemonStat = await prisma.pokemonStat.create({
     *   data: {
     *     // ... data to create a PokemonStat
     *   }
     * })
     * 
     */
    create<T extends PokemonStatCreateArgs>(args: SelectSubset<T, PokemonStatCreateArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PokemonStats.
     * @param {PokemonStatCreateManyArgs} args - Arguments to create many PokemonStats.
     * @example
     * // Create many PokemonStats
     * const pokemonStat = await prisma.pokemonStat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PokemonStatCreateManyArgs>(args?: SelectSubset<T, PokemonStatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PokemonStat.
     * @param {PokemonStatDeleteArgs} args - Arguments to delete one PokemonStat.
     * @example
     * // Delete one PokemonStat
     * const PokemonStat = await prisma.pokemonStat.delete({
     *   where: {
     *     // ... filter to delete one PokemonStat
     *   }
     * })
     * 
     */
    delete<T extends PokemonStatDeleteArgs>(args: SelectSubset<T, PokemonStatDeleteArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PokemonStat.
     * @param {PokemonStatUpdateArgs} args - Arguments to update one PokemonStat.
     * @example
     * // Update one PokemonStat
     * const pokemonStat = await prisma.pokemonStat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PokemonStatUpdateArgs>(args: SelectSubset<T, PokemonStatUpdateArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PokemonStats.
     * @param {PokemonStatDeleteManyArgs} args - Arguments to filter PokemonStats to delete.
     * @example
     * // Delete a few PokemonStats
     * const { count } = await prisma.pokemonStat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PokemonStatDeleteManyArgs>(args?: SelectSubset<T, PokemonStatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PokemonStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonStatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PokemonStats
     * const pokemonStat = await prisma.pokemonStat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PokemonStatUpdateManyArgs>(args: SelectSubset<T, PokemonStatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PokemonStat.
     * @param {PokemonStatUpsertArgs} args - Arguments to update or create a PokemonStat.
     * @example
     * // Update or create a PokemonStat
     * const pokemonStat = await prisma.pokemonStat.upsert({
     *   create: {
     *     // ... data to create a PokemonStat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PokemonStat we want to update
     *   }
     * })
     */
    upsert<T extends PokemonStatUpsertArgs>(args: SelectSubset<T, PokemonStatUpsertArgs<ExtArgs>>): Prisma__PokemonStatClient<$Result.GetResult<Prisma.$PokemonStatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PokemonStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonStatCountArgs} args - Arguments to filter PokemonStats to count.
     * @example
     * // Count the number of PokemonStats
     * const count = await prisma.pokemonStat.count({
     *   where: {
     *     // ... the filter for the PokemonStats we want to count
     *   }
     * })
    **/
    count<T extends PokemonStatCountArgs>(
      args?: Subset<T, PokemonStatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PokemonStatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PokemonStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonStatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PokemonStatAggregateArgs>(args: Subset<T, PokemonStatAggregateArgs>): Prisma.PrismaPromise<GetPokemonStatAggregateType<T>>

    /**
     * Group by PokemonStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonStatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PokemonStatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PokemonStatGroupByArgs['orderBy'] }
        : { orderBy?: PokemonStatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PokemonStatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPokemonStatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PokemonStat model
   */
  readonly fields: PokemonStatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PokemonStat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PokemonStatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pokemon<T extends PokemonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PokemonDefaultArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stat<T extends StatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StatDefaultArgs<ExtArgs>>): Prisma__StatClient<$Result.GetResult<Prisma.$StatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PokemonStat model
   */
  interface PokemonStatFieldRefs {
    readonly id: FieldRef<"PokemonStat", 'Int'>
    readonly pokemonId: FieldRef<"PokemonStat", 'Int'>
    readonly statId: FieldRef<"PokemonStat", 'Int'>
    readonly level: FieldRef<"PokemonStat", 'Int'>
    readonly value: FieldRef<"PokemonStat", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * PokemonStat findUnique
   */
  export type PokemonStatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * Filter, which PokemonStat to fetch.
     */
    where: PokemonStatWhereUniqueInput
  }

  /**
   * PokemonStat findUniqueOrThrow
   */
  export type PokemonStatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * Filter, which PokemonStat to fetch.
     */
    where: PokemonStatWhereUniqueInput
  }

  /**
   * PokemonStat findFirst
   */
  export type PokemonStatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * Filter, which PokemonStat to fetch.
     */
    where?: PokemonStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonStats to fetch.
     */
    orderBy?: PokemonStatOrderByWithRelationInput | PokemonStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokemonStats.
     */
    cursor?: PokemonStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokemonStats.
     */
    distinct?: PokemonStatScalarFieldEnum | PokemonStatScalarFieldEnum[]
  }

  /**
   * PokemonStat findFirstOrThrow
   */
  export type PokemonStatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * Filter, which PokemonStat to fetch.
     */
    where?: PokemonStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonStats to fetch.
     */
    orderBy?: PokemonStatOrderByWithRelationInput | PokemonStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokemonStats.
     */
    cursor?: PokemonStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokemonStats.
     */
    distinct?: PokemonStatScalarFieldEnum | PokemonStatScalarFieldEnum[]
  }

  /**
   * PokemonStat findMany
   */
  export type PokemonStatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * Filter, which PokemonStats to fetch.
     */
    where?: PokemonStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonStats to fetch.
     */
    orderBy?: PokemonStatOrderByWithRelationInput | PokemonStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PokemonStats.
     */
    cursor?: PokemonStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonStats.
     */
    skip?: number
    distinct?: PokemonStatScalarFieldEnum | PokemonStatScalarFieldEnum[]
  }

  /**
   * PokemonStat create
   */
  export type PokemonStatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * The data needed to create a PokemonStat.
     */
    data: XOR<PokemonStatCreateInput, PokemonStatUncheckedCreateInput>
  }

  /**
   * PokemonStat createMany
   */
  export type PokemonStatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PokemonStats.
     */
    data: PokemonStatCreateManyInput | PokemonStatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PokemonStat update
   */
  export type PokemonStatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * The data needed to update a PokemonStat.
     */
    data: XOR<PokemonStatUpdateInput, PokemonStatUncheckedUpdateInput>
    /**
     * Choose, which PokemonStat to update.
     */
    where: PokemonStatWhereUniqueInput
  }

  /**
   * PokemonStat updateMany
   */
  export type PokemonStatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PokemonStats.
     */
    data: XOR<PokemonStatUpdateManyMutationInput, PokemonStatUncheckedUpdateManyInput>
    /**
     * Filter which PokemonStats to update
     */
    where?: PokemonStatWhereInput
    /**
     * Limit how many PokemonStats to update.
     */
    limit?: number
  }

  /**
   * PokemonStat upsert
   */
  export type PokemonStatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * The filter to search for the PokemonStat to update in case it exists.
     */
    where: PokemonStatWhereUniqueInput
    /**
     * In case the PokemonStat found by the `where` argument doesn't exist, create a new PokemonStat with this data.
     */
    create: XOR<PokemonStatCreateInput, PokemonStatUncheckedCreateInput>
    /**
     * In case the PokemonStat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PokemonStatUpdateInput, PokemonStatUncheckedUpdateInput>
  }

  /**
   * PokemonStat delete
   */
  export type PokemonStatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
    /**
     * Filter which PokemonStat to delete.
     */
    where: PokemonStatWhereUniqueInput
  }

  /**
   * PokemonStat deleteMany
   */
  export type PokemonStatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokemonStats to delete
     */
    where?: PokemonStatWhereInput
    /**
     * Limit how many PokemonStats to delete.
     */
    limit?: number
  }

  /**
   * PokemonStat without action
   */
  export type PokemonStatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonStat
     */
    select?: PokemonStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonStat
     */
    omit?: PokemonStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonStatInclude<ExtArgs> | null
  }


  /**
   * Model PokemonCounter
   */

  export type AggregatePokemonCounter = {
    _count: PokemonCounterCountAggregateOutputType | null
    _avg: PokemonCounterAvgAggregateOutputType | null
    _sum: PokemonCounterSumAggregateOutputType | null
    _min: PokemonCounterMinAggregateOutputType | null
    _max: PokemonCounterMaxAggregateOutputType | null
  }

  export type PokemonCounterAvgAggregateOutputType = {
    id: number | null
    targetPokemonId: number | null
    counterPokemonId: number | null
    upvotes: number | null
    downvotes: number | null
  }

  export type PokemonCounterSumAggregateOutputType = {
    id: number | null
    targetPokemonId: number | null
    counterPokemonId: number | null
    upvotes: number | null
    downvotes: number | null
  }

  export type PokemonCounterMinAggregateOutputType = {
    id: number | null
    targetPokemonId: number | null
    counterPokemonId: number | null
    reason: string | null
    upvotes: number | null
    downvotes: number | null
  }

  export type PokemonCounterMaxAggregateOutputType = {
    id: number | null
    targetPokemonId: number | null
    counterPokemonId: number | null
    reason: string | null
    upvotes: number | null
    downvotes: number | null
  }

  export type PokemonCounterCountAggregateOutputType = {
    id: number
    targetPokemonId: number
    counterPokemonId: number
    reason: number
    upvotes: number
    downvotes: number
    _all: number
  }


  export type PokemonCounterAvgAggregateInputType = {
    id?: true
    targetPokemonId?: true
    counterPokemonId?: true
    upvotes?: true
    downvotes?: true
  }

  export type PokemonCounterSumAggregateInputType = {
    id?: true
    targetPokemonId?: true
    counterPokemonId?: true
    upvotes?: true
    downvotes?: true
  }

  export type PokemonCounterMinAggregateInputType = {
    id?: true
    targetPokemonId?: true
    counterPokemonId?: true
    reason?: true
    upvotes?: true
    downvotes?: true
  }

  export type PokemonCounterMaxAggregateInputType = {
    id?: true
    targetPokemonId?: true
    counterPokemonId?: true
    reason?: true
    upvotes?: true
    downvotes?: true
  }

  export type PokemonCounterCountAggregateInputType = {
    id?: true
    targetPokemonId?: true
    counterPokemonId?: true
    reason?: true
    upvotes?: true
    downvotes?: true
    _all?: true
  }

  export type PokemonCounterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokemonCounter to aggregate.
     */
    where?: PokemonCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonCounters to fetch.
     */
    orderBy?: PokemonCounterOrderByWithRelationInput | PokemonCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PokemonCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PokemonCounters
    **/
    _count?: true | PokemonCounterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PokemonCounterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PokemonCounterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PokemonCounterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PokemonCounterMaxAggregateInputType
  }

  export type GetPokemonCounterAggregateType<T extends PokemonCounterAggregateArgs> = {
        [P in keyof T & keyof AggregatePokemonCounter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePokemonCounter[P]>
      : GetScalarType<T[P], AggregatePokemonCounter[P]>
  }




  export type PokemonCounterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokemonCounterWhereInput
    orderBy?: PokemonCounterOrderByWithAggregationInput | PokemonCounterOrderByWithAggregationInput[]
    by: PokemonCounterScalarFieldEnum[] | PokemonCounterScalarFieldEnum
    having?: PokemonCounterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PokemonCounterCountAggregateInputType | true
    _avg?: PokemonCounterAvgAggregateInputType
    _sum?: PokemonCounterSumAggregateInputType
    _min?: PokemonCounterMinAggregateInputType
    _max?: PokemonCounterMaxAggregateInputType
  }

  export type PokemonCounterGroupByOutputType = {
    id: number
    targetPokemonId: number
    counterPokemonId: number
    reason: string | null
    upvotes: number
    downvotes: number
    _count: PokemonCounterCountAggregateOutputType | null
    _avg: PokemonCounterAvgAggregateOutputType | null
    _sum: PokemonCounterSumAggregateOutputType | null
    _min: PokemonCounterMinAggregateOutputType | null
    _max: PokemonCounterMaxAggregateOutputType | null
  }

  type GetPokemonCounterGroupByPayload<T extends PokemonCounterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PokemonCounterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PokemonCounterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PokemonCounterGroupByOutputType[P]>
            : GetScalarType<T[P], PokemonCounterGroupByOutputType[P]>
        }
      >
    >


  export type PokemonCounterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    targetPokemonId?: boolean
    counterPokemonId?: boolean
    reason?: boolean
    upvotes?: boolean
    downvotes?: boolean
    targetPokemon?: boolean | PokemonDefaultArgs<ExtArgs>
    counterPokemon?: boolean | PokemonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pokemonCounter"]>



  export type PokemonCounterSelectScalar = {
    id?: boolean
    targetPokemonId?: boolean
    counterPokemonId?: boolean
    reason?: boolean
    upvotes?: boolean
    downvotes?: boolean
  }

  export type PokemonCounterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "targetPokemonId" | "counterPokemonId" | "reason" | "upvotes" | "downvotes", ExtArgs["result"]["pokemonCounter"]>
  export type PokemonCounterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targetPokemon?: boolean | PokemonDefaultArgs<ExtArgs>
    counterPokemon?: boolean | PokemonDefaultArgs<ExtArgs>
  }

  export type $PokemonCounterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PokemonCounter"
    objects: {
      targetPokemon: Prisma.$PokemonPayload<ExtArgs>
      counterPokemon: Prisma.$PokemonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      targetPokemonId: number
      counterPokemonId: number
      reason: string | null
      upvotes: number
      downvotes: number
    }, ExtArgs["result"]["pokemonCounter"]>
    composites: {}
  }

  type PokemonCounterGetPayload<S extends boolean | null | undefined | PokemonCounterDefaultArgs> = $Result.GetResult<Prisma.$PokemonCounterPayload, S>

  type PokemonCounterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PokemonCounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PokemonCounterCountAggregateInputType | true
    }

  export interface PokemonCounterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PokemonCounter'], meta: { name: 'PokemonCounter' } }
    /**
     * Find zero or one PokemonCounter that matches the filter.
     * @param {PokemonCounterFindUniqueArgs} args - Arguments to find a PokemonCounter
     * @example
     * // Get one PokemonCounter
     * const pokemonCounter = await prisma.pokemonCounter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PokemonCounterFindUniqueArgs>(args: SelectSubset<T, PokemonCounterFindUniqueArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PokemonCounter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PokemonCounterFindUniqueOrThrowArgs} args - Arguments to find a PokemonCounter
     * @example
     * // Get one PokemonCounter
     * const pokemonCounter = await prisma.pokemonCounter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PokemonCounterFindUniqueOrThrowArgs>(args: SelectSubset<T, PokemonCounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokemonCounter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCounterFindFirstArgs} args - Arguments to find a PokemonCounter
     * @example
     * // Get one PokemonCounter
     * const pokemonCounter = await prisma.pokemonCounter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PokemonCounterFindFirstArgs>(args?: SelectSubset<T, PokemonCounterFindFirstArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokemonCounter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCounterFindFirstOrThrowArgs} args - Arguments to find a PokemonCounter
     * @example
     * // Get one PokemonCounter
     * const pokemonCounter = await prisma.pokemonCounter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PokemonCounterFindFirstOrThrowArgs>(args?: SelectSubset<T, PokemonCounterFindFirstOrThrowArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PokemonCounters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCounterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PokemonCounters
     * const pokemonCounters = await prisma.pokemonCounter.findMany()
     * 
     * // Get first 10 PokemonCounters
     * const pokemonCounters = await prisma.pokemonCounter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pokemonCounterWithIdOnly = await prisma.pokemonCounter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PokemonCounterFindManyArgs>(args?: SelectSubset<T, PokemonCounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PokemonCounter.
     * @param {PokemonCounterCreateArgs} args - Arguments to create a PokemonCounter.
     * @example
     * // Create one PokemonCounter
     * const PokemonCounter = await prisma.pokemonCounter.create({
     *   data: {
     *     // ... data to create a PokemonCounter
     *   }
     * })
     * 
     */
    create<T extends PokemonCounterCreateArgs>(args: SelectSubset<T, PokemonCounterCreateArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PokemonCounters.
     * @param {PokemonCounterCreateManyArgs} args - Arguments to create many PokemonCounters.
     * @example
     * // Create many PokemonCounters
     * const pokemonCounter = await prisma.pokemonCounter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PokemonCounterCreateManyArgs>(args?: SelectSubset<T, PokemonCounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PokemonCounter.
     * @param {PokemonCounterDeleteArgs} args - Arguments to delete one PokemonCounter.
     * @example
     * // Delete one PokemonCounter
     * const PokemonCounter = await prisma.pokemonCounter.delete({
     *   where: {
     *     // ... filter to delete one PokemonCounter
     *   }
     * })
     * 
     */
    delete<T extends PokemonCounterDeleteArgs>(args: SelectSubset<T, PokemonCounterDeleteArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PokemonCounter.
     * @param {PokemonCounterUpdateArgs} args - Arguments to update one PokemonCounter.
     * @example
     * // Update one PokemonCounter
     * const pokemonCounter = await prisma.pokemonCounter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PokemonCounterUpdateArgs>(args: SelectSubset<T, PokemonCounterUpdateArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PokemonCounters.
     * @param {PokemonCounterDeleteManyArgs} args - Arguments to filter PokemonCounters to delete.
     * @example
     * // Delete a few PokemonCounters
     * const { count } = await prisma.pokemonCounter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PokemonCounterDeleteManyArgs>(args?: SelectSubset<T, PokemonCounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PokemonCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PokemonCounters
     * const pokemonCounter = await prisma.pokemonCounter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PokemonCounterUpdateManyArgs>(args: SelectSubset<T, PokemonCounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PokemonCounter.
     * @param {PokemonCounterUpsertArgs} args - Arguments to update or create a PokemonCounter.
     * @example
     * // Update or create a PokemonCounter
     * const pokemonCounter = await prisma.pokemonCounter.upsert({
     *   create: {
     *     // ... data to create a PokemonCounter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PokemonCounter we want to update
     *   }
     * })
     */
    upsert<T extends PokemonCounterUpsertArgs>(args: SelectSubset<T, PokemonCounterUpsertArgs<ExtArgs>>): Prisma__PokemonCounterClient<$Result.GetResult<Prisma.$PokemonCounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PokemonCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCounterCountArgs} args - Arguments to filter PokemonCounters to count.
     * @example
     * // Count the number of PokemonCounters
     * const count = await prisma.pokemonCounter.count({
     *   where: {
     *     // ... the filter for the PokemonCounters we want to count
     *   }
     * })
    **/
    count<T extends PokemonCounterCountArgs>(
      args?: Subset<T, PokemonCounterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PokemonCounterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PokemonCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PokemonCounterAggregateArgs>(args: Subset<T, PokemonCounterAggregateArgs>): Prisma.PrismaPromise<GetPokemonCounterAggregateType<T>>

    /**
     * Group by PokemonCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokemonCounterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PokemonCounterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PokemonCounterGroupByArgs['orderBy'] }
        : { orderBy?: PokemonCounterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PokemonCounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPokemonCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PokemonCounter model
   */
  readonly fields: PokemonCounterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PokemonCounter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PokemonCounterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    targetPokemon<T extends PokemonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PokemonDefaultArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    counterPokemon<T extends PokemonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PokemonDefaultArgs<ExtArgs>>): Prisma__PokemonClient<$Result.GetResult<Prisma.$PokemonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PokemonCounter model
   */
  interface PokemonCounterFieldRefs {
    readonly id: FieldRef<"PokemonCounter", 'Int'>
    readonly targetPokemonId: FieldRef<"PokemonCounter", 'Int'>
    readonly counterPokemonId: FieldRef<"PokemonCounter", 'Int'>
    readonly reason: FieldRef<"PokemonCounter", 'String'>
    readonly upvotes: FieldRef<"PokemonCounter", 'Int'>
    readonly downvotes: FieldRef<"PokemonCounter", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PokemonCounter findUnique
   */
  export type PokemonCounterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * Filter, which PokemonCounter to fetch.
     */
    where: PokemonCounterWhereUniqueInput
  }

  /**
   * PokemonCounter findUniqueOrThrow
   */
  export type PokemonCounterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * Filter, which PokemonCounter to fetch.
     */
    where: PokemonCounterWhereUniqueInput
  }

  /**
   * PokemonCounter findFirst
   */
  export type PokemonCounterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * Filter, which PokemonCounter to fetch.
     */
    where?: PokemonCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonCounters to fetch.
     */
    orderBy?: PokemonCounterOrderByWithRelationInput | PokemonCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokemonCounters.
     */
    cursor?: PokemonCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokemonCounters.
     */
    distinct?: PokemonCounterScalarFieldEnum | PokemonCounterScalarFieldEnum[]
  }

  /**
   * PokemonCounter findFirstOrThrow
   */
  export type PokemonCounterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * Filter, which PokemonCounter to fetch.
     */
    where?: PokemonCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonCounters to fetch.
     */
    orderBy?: PokemonCounterOrderByWithRelationInput | PokemonCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokemonCounters.
     */
    cursor?: PokemonCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokemonCounters.
     */
    distinct?: PokemonCounterScalarFieldEnum | PokemonCounterScalarFieldEnum[]
  }

  /**
   * PokemonCounter findMany
   */
  export type PokemonCounterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * Filter, which PokemonCounters to fetch.
     */
    where?: PokemonCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokemonCounters to fetch.
     */
    orderBy?: PokemonCounterOrderByWithRelationInput | PokemonCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PokemonCounters.
     */
    cursor?: PokemonCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokemonCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokemonCounters.
     */
    skip?: number
    distinct?: PokemonCounterScalarFieldEnum | PokemonCounterScalarFieldEnum[]
  }

  /**
   * PokemonCounter create
   */
  export type PokemonCounterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * The data needed to create a PokemonCounter.
     */
    data: XOR<PokemonCounterCreateInput, PokemonCounterUncheckedCreateInput>
  }

  /**
   * PokemonCounter createMany
   */
  export type PokemonCounterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PokemonCounters.
     */
    data: PokemonCounterCreateManyInput | PokemonCounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PokemonCounter update
   */
  export type PokemonCounterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * The data needed to update a PokemonCounter.
     */
    data: XOR<PokemonCounterUpdateInput, PokemonCounterUncheckedUpdateInput>
    /**
     * Choose, which PokemonCounter to update.
     */
    where: PokemonCounterWhereUniqueInput
  }

  /**
   * PokemonCounter updateMany
   */
  export type PokemonCounterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PokemonCounters.
     */
    data: XOR<PokemonCounterUpdateManyMutationInput, PokemonCounterUncheckedUpdateManyInput>
    /**
     * Filter which PokemonCounters to update
     */
    where?: PokemonCounterWhereInput
    /**
     * Limit how many PokemonCounters to update.
     */
    limit?: number
  }

  /**
   * PokemonCounter upsert
   */
  export type PokemonCounterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * The filter to search for the PokemonCounter to update in case it exists.
     */
    where: PokemonCounterWhereUniqueInput
    /**
     * In case the PokemonCounter found by the `where` argument doesn't exist, create a new PokemonCounter with this data.
     */
    create: XOR<PokemonCounterCreateInput, PokemonCounterUncheckedCreateInput>
    /**
     * In case the PokemonCounter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PokemonCounterUpdateInput, PokemonCounterUncheckedUpdateInput>
  }

  /**
   * PokemonCounter delete
   */
  export type PokemonCounterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
    /**
     * Filter which PokemonCounter to delete.
     */
    where: PokemonCounterWhereUniqueInput
  }

  /**
   * PokemonCounter deleteMany
   */
  export type PokemonCounterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokemonCounters to delete
     */
    where?: PokemonCounterWhereInput
    /**
     * Limit how many PokemonCounters to delete.
     */
    limit?: number
  }

  /**
   * PokemonCounter without action
   */
  export type PokemonCounterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokemonCounter
     */
    select?: PokemonCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokemonCounter
     */
    omit?: PokemonCounterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokemonCounterInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PokemonScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    nameJa: 'nameJa',
    nameEn: 'nameEn',
    damageClass: 'damageClass',
    rangeType: 'rangeType',
    battleStyle: 'battleStyle',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PokemonScalarFieldEnum = (typeof PokemonScalarFieldEnum)[keyof typeof PokemonScalarFieldEnum]


  export const StatScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type StatScalarFieldEnum = (typeof StatScalarFieldEnum)[keyof typeof StatScalarFieldEnum]


  export const PokemonStatScalarFieldEnum: {
    id: 'id',
    pokemonId: 'pokemonId',
    statId: 'statId',
    level: 'level',
    value: 'value'
  };

  export type PokemonStatScalarFieldEnum = (typeof PokemonStatScalarFieldEnum)[keyof typeof PokemonStatScalarFieldEnum]


  export const PokemonCounterScalarFieldEnum: {
    id: 'id',
    targetPokemonId: 'targetPokemonId',
    counterPokemonId: 'counterPokemonId',
    reason: 'reason',
    upvotes: 'upvotes',
    downvotes: 'downvotes'
  };

  export type PokemonCounterScalarFieldEnum = (typeof PokemonCounterScalarFieldEnum)[keyof typeof PokemonCounterScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const PokemonOrderByRelevanceFieldEnum: {
    slug: 'slug',
    nameJa: 'nameJa',
    nameEn: 'nameEn',
    damageClass: 'damageClass',
    rangeType: 'rangeType',
    battleStyle: 'battleStyle',
    imageUrl: 'imageUrl'
  };

  export type PokemonOrderByRelevanceFieldEnum = (typeof PokemonOrderByRelevanceFieldEnum)[keyof typeof PokemonOrderByRelevanceFieldEnum]


  export const StatOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type StatOrderByRelevanceFieldEnum = (typeof StatOrderByRelevanceFieldEnum)[keyof typeof StatOrderByRelevanceFieldEnum]


  export const PokemonCounterOrderByRelevanceFieldEnum: {
    reason: 'reason'
  };

  export type PokemonCounterOrderByRelevanceFieldEnum = (typeof PokemonCounterOrderByRelevanceFieldEnum)[keyof typeof PokemonCounterOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PokemonWhereInput = {
    AND?: PokemonWhereInput | PokemonWhereInput[]
    OR?: PokemonWhereInput[]
    NOT?: PokemonWhereInput | PokemonWhereInput[]
    id?: IntFilter<"Pokemon"> | number
    slug?: StringFilter<"Pokemon"> | string
    nameJa?: StringFilter<"Pokemon"> | string
    nameEn?: StringFilter<"Pokemon"> | string
    damageClass?: StringFilter<"Pokemon"> | string
    rangeType?: StringFilter<"Pokemon"> | string
    battleStyle?: StringFilter<"Pokemon"> | string
    imageUrl?: StringNullableFilter<"Pokemon"> | string | null
    createdAt?: DateTimeFilter<"Pokemon"> | Date | string
    updatedAt?: DateTimeFilter<"Pokemon"> | Date | string
    stats?: PokemonStatListRelationFilter
    targetOf?: PokemonCounterListRelationFilter
    counterFor?: PokemonCounterListRelationFilter
  }

  export type PokemonOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    nameJa?: SortOrder
    nameEn?: SortOrder
    damageClass?: SortOrder
    rangeType?: SortOrder
    battleStyle?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stats?: PokemonStatOrderByRelationAggregateInput
    targetOf?: PokemonCounterOrderByRelationAggregateInput
    counterFor?: PokemonCounterOrderByRelationAggregateInput
    _relevance?: PokemonOrderByRelevanceInput
  }

  export type PokemonWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: PokemonWhereInput | PokemonWhereInput[]
    OR?: PokemonWhereInput[]
    NOT?: PokemonWhereInput | PokemonWhereInput[]
    nameJa?: StringFilter<"Pokemon"> | string
    nameEn?: StringFilter<"Pokemon"> | string
    damageClass?: StringFilter<"Pokemon"> | string
    rangeType?: StringFilter<"Pokemon"> | string
    battleStyle?: StringFilter<"Pokemon"> | string
    imageUrl?: StringNullableFilter<"Pokemon"> | string | null
    createdAt?: DateTimeFilter<"Pokemon"> | Date | string
    updatedAt?: DateTimeFilter<"Pokemon"> | Date | string
    stats?: PokemonStatListRelationFilter
    targetOf?: PokemonCounterListRelationFilter
    counterFor?: PokemonCounterListRelationFilter
  }, "id" | "slug">

  export type PokemonOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    nameJa?: SortOrder
    nameEn?: SortOrder
    damageClass?: SortOrder
    rangeType?: SortOrder
    battleStyle?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PokemonCountOrderByAggregateInput
    _avg?: PokemonAvgOrderByAggregateInput
    _max?: PokemonMaxOrderByAggregateInput
    _min?: PokemonMinOrderByAggregateInput
    _sum?: PokemonSumOrderByAggregateInput
  }

  export type PokemonScalarWhereWithAggregatesInput = {
    AND?: PokemonScalarWhereWithAggregatesInput | PokemonScalarWhereWithAggregatesInput[]
    OR?: PokemonScalarWhereWithAggregatesInput[]
    NOT?: PokemonScalarWhereWithAggregatesInput | PokemonScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pokemon"> | number
    slug?: StringWithAggregatesFilter<"Pokemon"> | string
    nameJa?: StringWithAggregatesFilter<"Pokemon"> | string
    nameEn?: StringWithAggregatesFilter<"Pokemon"> | string
    damageClass?: StringWithAggregatesFilter<"Pokemon"> | string
    rangeType?: StringWithAggregatesFilter<"Pokemon"> | string
    battleStyle?: StringWithAggregatesFilter<"Pokemon"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Pokemon"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pokemon"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pokemon"> | Date | string
  }

  export type StatWhereInput = {
    AND?: StatWhereInput | StatWhereInput[]
    OR?: StatWhereInput[]
    NOT?: StatWhereInput | StatWhereInput[]
    id?: IntFilter<"Stat"> | number
    name?: StringFilter<"Stat"> | string
    pokemonStats?: PokemonStatListRelationFilter
  }

  export type StatOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    pokemonStats?: PokemonStatOrderByRelationAggregateInput
    _relevance?: StatOrderByRelevanceInput
  }

  export type StatWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StatWhereInput | StatWhereInput[]
    OR?: StatWhereInput[]
    NOT?: StatWhereInput | StatWhereInput[]
    name?: StringFilter<"Stat"> | string
    pokemonStats?: PokemonStatListRelationFilter
  }, "id">

  export type StatOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: StatCountOrderByAggregateInput
    _avg?: StatAvgOrderByAggregateInput
    _max?: StatMaxOrderByAggregateInput
    _min?: StatMinOrderByAggregateInput
    _sum?: StatSumOrderByAggregateInput
  }

  export type StatScalarWhereWithAggregatesInput = {
    AND?: StatScalarWhereWithAggregatesInput | StatScalarWhereWithAggregatesInput[]
    OR?: StatScalarWhereWithAggregatesInput[]
    NOT?: StatScalarWhereWithAggregatesInput | StatScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Stat"> | number
    name?: StringWithAggregatesFilter<"Stat"> | string
  }

  export type PokemonStatWhereInput = {
    AND?: PokemonStatWhereInput | PokemonStatWhereInput[]
    OR?: PokemonStatWhereInput[]
    NOT?: PokemonStatWhereInput | PokemonStatWhereInput[]
    id?: IntFilter<"PokemonStat"> | number
    pokemonId?: IntFilter<"PokemonStat"> | number
    statId?: IntFilter<"PokemonStat"> | number
    level?: IntFilter<"PokemonStat"> | number
    value?: FloatFilter<"PokemonStat"> | number
    pokemon?: XOR<PokemonScalarRelationFilter, PokemonWhereInput>
    stat?: XOR<StatScalarRelationFilter, StatWhereInput>
  }

  export type PokemonStatOrderByWithRelationInput = {
    id?: SortOrder
    pokemonId?: SortOrder
    statId?: SortOrder
    level?: SortOrder
    value?: SortOrder
    pokemon?: PokemonOrderByWithRelationInput
    stat?: StatOrderByWithRelationInput
  }

  export type PokemonStatWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PokemonStatWhereInput | PokemonStatWhereInput[]
    OR?: PokemonStatWhereInput[]
    NOT?: PokemonStatWhereInput | PokemonStatWhereInput[]
    pokemonId?: IntFilter<"PokemonStat"> | number
    statId?: IntFilter<"PokemonStat"> | number
    level?: IntFilter<"PokemonStat"> | number
    value?: FloatFilter<"PokemonStat"> | number
    pokemon?: XOR<PokemonScalarRelationFilter, PokemonWhereInput>
    stat?: XOR<StatScalarRelationFilter, StatWhereInput>
  }, "id">

  export type PokemonStatOrderByWithAggregationInput = {
    id?: SortOrder
    pokemonId?: SortOrder
    statId?: SortOrder
    level?: SortOrder
    value?: SortOrder
    _count?: PokemonStatCountOrderByAggregateInput
    _avg?: PokemonStatAvgOrderByAggregateInput
    _max?: PokemonStatMaxOrderByAggregateInput
    _min?: PokemonStatMinOrderByAggregateInput
    _sum?: PokemonStatSumOrderByAggregateInput
  }

  export type PokemonStatScalarWhereWithAggregatesInput = {
    AND?: PokemonStatScalarWhereWithAggregatesInput | PokemonStatScalarWhereWithAggregatesInput[]
    OR?: PokemonStatScalarWhereWithAggregatesInput[]
    NOT?: PokemonStatScalarWhereWithAggregatesInput | PokemonStatScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PokemonStat"> | number
    pokemonId?: IntWithAggregatesFilter<"PokemonStat"> | number
    statId?: IntWithAggregatesFilter<"PokemonStat"> | number
    level?: IntWithAggregatesFilter<"PokemonStat"> | number
    value?: FloatWithAggregatesFilter<"PokemonStat"> | number
  }

  export type PokemonCounterWhereInput = {
    AND?: PokemonCounterWhereInput | PokemonCounterWhereInput[]
    OR?: PokemonCounterWhereInput[]
    NOT?: PokemonCounterWhereInput | PokemonCounterWhereInput[]
    id?: IntFilter<"PokemonCounter"> | number
    targetPokemonId?: IntFilter<"PokemonCounter"> | number
    counterPokemonId?: IntFilter<"PokemonCounter"> | number
    reason?: StringNullableFilter<"PokemonCounter"> | string | null
    upvotes?: IntFilter<"PokemonCounter"> | number
    downvotes?: IntFilter<"PokemonCounter"> | number
    targetPokemon?: XOR<PokemonScalarRelationFilter, PokemonWhereInput>
    counterPokemon?: XOR<PokemonScalarRelationFilter, PokemonWhereInput>
  }

  export type PokemonCounterOrderByWithRelationInput = {
    id?: SortOrder
    targetPokemonId?: SortOrder
    counterPokemonId?: SortOrder
    reason?: SortOrderInput | SortOrder
    upvotes?: SortOrder
    downvotes?: SortOrder
    targetPokemon?: PokemonOrderByWithRelationInput
    counterPokemon?: PokemonOrderByWithRelationInput
    _relevance?: PokemonCounterOrderByRelevanceInput
  }

  export type PokemonCounterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PokemonCounterWhereInput | PokemonCounterWhereInput[]
    OR?: PokemonCounterWhereInput[]
    NOT?: PokemonCounterWhereInput | PokemonCounterWhereInput[]
    targetPokemonId?: IntFilter<"PokemonCounter"> | number
    counterPokemonId?: IntFilter<"PokemonCounter"> | number
    reason?: StringNullableFilter<"PokemonCounter"> | string | null
    upvotes?: IntFilter<"PokemonCounter"> | number
    downvotes?: IntFilter<"PokemonCounter"> | number
    targetPokemon?: XOR<PokemonScalarRelationFilter, PokemonWhereInput>
    counterPokemon?: XOR<PokemonScalarRelationFilter, PokemonWhereInput>
  }, "id">

  export type PokemonCounterOrderByWithAggregationInput = {
    id?: SortOrder
    targetPokemonId?: SortOrder
    counterPokemonId?: SortOrder
    reason?: SortOrderInput | SortOrder
    upvotes?: SortOrder
    downvotes?: SortOrder
    _count?: PokemonCounterCountOrderByAggregateInput
    _avg?: PokemonCounterAvgOrderByAggregateInput
    _max?: PokemonCounterMaxOrderByAggregateInput
    _min?: PokemonCounterMinOrderByAggregateInput
    _sum?: PokemonCounterSumOrderByAggregateInput
  }

  export type PokemonCounterScalarWhereWithAggregatesInput = {
    AND?: PokemonCounterScalarWhereWithAggregatesInput | PokemonCounterScalarWhereWithAggregatesInput[]
    OR?: PokemonCounterScalarWhereWithAggregatesInput[]
    NOT?: PokemonCounterScalarWhereWithAggregatesInput | PokemonCounterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PokemonCounter"> | number
    targetPokemonId?: IntWithAggregatesFilter<"PokemonCounter"> | number
    counterPokemonId?: IntWithAggregatesFilter<"PokemonCounter"> | number
    reason?: StringNullableWithAggregatesFilter<"PokemonCounter"> | string | null
    upvotes?: IntWithAggregatesFilter<"PokemonCounter"> | number
    downvotes?: IntWithAggregatesFilter<"PokemonCounter"> | number
  }

  export type PokemonCreateInput = {
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: PokemonStatCreateNestedManyWithoutPokemonInput
    targetOf?: PokemonCounterCreateNestedManyWithoutTargetPokemonInput
    counterFor?: PokemonCounterCreateNestedManyWithoutCounterPokemonInput
  }

  export type PokemonUncheckedCreateInput = {
    id?: number
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: PokemonStatUncheckedCreateNestedManyWithoutPokemonInput
    targetOf?: PokemonCounterUncheckedCreateNestedManyWithoutTargetPokemonInput
    counterFor?: PokemonCounterUncheckedCreateNestedManyWithoutCounterPokemonInput
  }

  export type PokemonUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PokemonStatUpdateManyWithoutPokemonNestedInput
    targetOf?: PokemonCounterUpdateManyWithoutTargetPokemonNestedInput
    counterFor?: PokemonCounterUpdateManyWithoutCounterPokemonNestedInput
  }

  export type PokemonUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PokemonStatUncheckedUpdateManyWithoutPokemonNestedInput
    targetOf?: PokemonCounterUncheckedUpdateManyWithoutTargetPokemonNestedInput
    counterFor?: PokemonCounterUncheckedUpdateManyWithoutCounterPokemonNestedInput
  }

  export type PokemonCreateManyInput = {
    id?: number
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PokemonUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PokemonUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatCreateInput = {
    name: string
    pokemonStats?: PokemonStatCreateNestedManyWithoutStatInput
  }

  export type StatUncheckedCreateInput = {
    id?: number
    name: string
    pokemonStats?: PokemonStatUncheckedCreateNestedManyWithoutStatInput
  }

  export type StatUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    pokemonStats?: PokemonStatUpdateManyWithoutStatNestedInput
  }

  export type StatUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    pokemonStats?: PokemonStatUncheckedUpdateManyWithoutStatNestedInput
  }

  export type StatCreateManyInput = {
    id?: number
    name: string
  }

  export type StatUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StatUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PokemonStatCreateInput = {
    level: number
    value: number
    pokemon: PokemonCreateNestedOneWithoutStatsInput
    stat: StatCreateNestedOneWithoutPokemonStatsInput
  }

  export type PokemonStatUncheckedCreateInput = {
    id?: number
    pokemonId: number
    statId: number
    level: number
    value: number
  }

  export type PokemonStatUpdateInput = {
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    pokemon?: PokemonUpdateOneRequiredWithoutStatsNestedInput
    stat?: StatUpdateOneRequiredWithoutPokemonStatsNestedInput
  }

  export type PokemonStatUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pokemonId?: IntFieldUpdateOperationsInput | number
    statId?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type PokemonStatCreateManyInput = {
    id?: number
    pokemonId: number
    statId: number
    level: number
    value: number
  }

  export type PokemonStatUpdateManyMutationInput = {
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type PokemonStatUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pokemonId?: IntFieldUpdateOperationsInput | number
    statId?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type PokemonCounterCreateInput = {
    reason?: string | null
    upvotes?: number
    downvotes?: number
    targetPokemon: PokemonCreateNestedOneWithoutTargetOfInput
    counterPokemon: PokemonCreateNestedOneWithoutCounterForInput
  }

  export type PokemonCounterUncheckedCreateInput = {
    id?: number
    targetPokemonId: number
    counterPokemonId: number
    reason?: string | null
    upvotes?: number
    downvotes?: number
  }

  export type PokemonCounterUpdateInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
    targetPokemon?: PokemonUpdateOneRequiredWithoutTargetOfNestedInput
    counterPokemon?: PokemonUpdateOneRequiredWithoutCounterForNestedInput
  }

  export type PokemonCounterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    targetPokemonId?: IntFieldUpdateOperationsInput | number
    counterPokemonId?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
  }

  export type PokemonCounterCreateManyInput = {
    id?: number
    targetPokemonId: number
    counterPokemonId: number
    reason?: string | null
    upvotes?: number
    downvotes?: number
  }

  export type PokemonCounterUpdateManyMutationInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
  }

  export type PokemonCounterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    targetPokemonId?: IntFieldUpdateOperationsInput | number
    counterPokemonId?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PokemonStatListRelationFilter = {
    every?: PokemonStatWhereInput
    some?: PokemonStatWhereInput
    none?: PokemonStatWhereInput
  }

  export type PokemonCounterListRelationFilter = {
    every?: PokemonCounterWhereInput
    some?: PokemonCounterWhereInput
    none?: PokemonCounterWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PokemonStatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PokemonCounterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PokemonOrderByRelevanceInput = {
    fields: PokemonOrderByRelevanceFieldEnum | PokemonOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PokemonCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    nameJa?: SortOrder
    nameEn?: SortOrder
    damageClass?: SortOrder
    rangeType?: SortOrder
    battleStyle?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PokemonAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PokemonMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    nameJa?: SortOrder
    nameEn?: SortOrder
    damageClass?: SortOrder
    rangeType?: SortOrder
    battleStyle?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PokemonMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    nameJa?: SortOrder
    nameEn?: SortOrder
    damageClass?: SortOrder
    rangeType?: SortOrder
    battleStyle?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PokemonSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StatOrderByRelevanceInput = {
    fields: StatOrderByRelevanceFieldEnum | StatOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type StatCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StatAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StatMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StatMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StatSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PokemonScalarRelationFilter = {
    is?: PokemonWhereInput
    isNot?: PokemonWhereInput
  }

  export type StatScalarRelationFilter = {
    is?: StatWhereInput
    isNot?: StatWhereInput
  }

  export type PokemonStatCountOrderByAggregateInput = {
    id?: SortOrder
    pokemonId?: SortOrder
    statId?: SortOrder
    level?: SortOrder
    value?: SortOrder
  }

  export type PokemonStatAvgOrderByAggregateInput = {
    id?: SortOrder
    pokemonId?: SortOrder
    statId?: SortOrder
    level?: SortOrder
    value?: SortOrder
  }

  export type PokemonStatMaxOrderByAggregateInput = {
    id?: SortOrder
    pokemonId?: SortOrder
    statId?: SortOrder
    level?: SortOrder
    value?: SortOrder
  }

  export type PokemonStatMinOrderByAggregateInput = {
    id?: SortOrder
    pokemonId?: SortOrder
    statId?: SortOrder
    level?: SortOrder
    value?: SortOrder
  }

  export type PokemonStatSumOrderByAggregateInput = {
    id?: SortOrder
    pokemonId?: SortOrder
    statId?: SortOrder
    level?: SortOrder
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PokemonCounterOrderByRelevanceInput = {
    fields: PokemonCounterOrderByRelevanceFieldEnum | PokemonCounterOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PokemonCounterCountOrderByAggregateInput = {
    id?: SortOrder
    targetPokemonId?: SortOrder
    counterPokemonId?: SortOrder
    reason?: SortOrder
    upvotes?: SortOrder
    downvotes?: SortOrder
  }

  export type PokemonCounterAvgOrderByAggregateInput = {
    id?: SortOrder
    targetPokemonId?: SortOrder
    counterPokemonId?: SortOrder
    upvotes?: SortOrder
    downvotes?: SortOrder
  }

  export type PokemonCounterMaxOrderByAggregateInput = {
    id?: SortOrder
    targetPokemonId?: SortOrder
    counterPokemonId?: SortOrder
    reason?: SortOrder
    upvotes?: SortOrder
    downvotes?: SortOrder
  }

  export type PokemonCounterMinOrderByAggregateInput = {
    id?: SortOrder
    targetPokemonId?: SortOrder
    counterPokemonId?: SortOrder
    reason?: SortOrder
    upvotes?: SortOrder
    downvotes?: SortOrder
  }

  export type PokemonCounterSumOrderByAggregateInput = {
    id?: SortOrder
    targetPokemonId?: SortOrder
    counterPokemonId?: SortOrder
    upvotes?: SortOrder
    downvotes?: SortOrder
  }

  export type PokemonStatCreateNestedManyWithoutPokemonInput = {
    create?: XOR<PokemonStatCreateWithoutPokemonInput, PokemonStatUncheckedCreateWithoutPokemonInput> | PokemonStatCreateWithoutPokemonInput[] | PokemonStatUncheckedCreateWithoutPokemonInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutPokemonInput | PokemonStatCreateOrConnectWithoutPokemonInput[]
    createMany?: PokemonStatCreateManyPokemonInputEnvelope
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
  }

  export type PokemonCounterCreateNestedManyWithoutTargetPokemonInput = {
    create?: XOR<PokemonCounterCreateWithoutTargetPokemonInput, PokemonCounterUncheckedCreateWithoutTargetPokemonInput> | PokemonCounterCreateWithoutTargetPokemonInput[] | PokemonCounterUncheckedCreateWithoutTargetPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutTargetPokemonInput | PokemonCounterCreateOrConnectWithoutTargetPokemonInput[]
    createMany?: PokemonCounterCreateManyTargetPokemonInputEnvelope
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
  }

  export type PokemonCounterCreateNestedManyWithoutCounterPokemonInput = {
    create?: XOR<PokemonCounterCreateWithoutCounterPokemonInput, PokemonCounterUncheckedCreateWithoutCounterPokemonInput> | PokemonCounterCreateWithoutCounterPokemonInput[] | PokemonCounterUncheckedCreateWithoutCounterPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutCounterPokemonInput | PokemonCounterCreateOrConnectWithoutCounterPokemonInput[]
    createMany?: PokemonCounterCreateManyCounterPokemonInputEnvelope
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
  }

  export type PokemonStatUncheckedCreateNestedManyWithoutPokemonInput = {
    create?: XOR<PokemonStatCreateWithoutPokemonInput, PokemonStatUncheckedCreateWithoutPokemonInput> | PokemonStatCreateWithoutPokemonInput[] | PokemonStatUncheckedCreateWithoutPokemonInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutPokemonInput | PokemonStatCreateOrConnectWithoutPokemonInput[]
    createMany?: PokemonStatCreateManyPokemonInputEnvelope
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
  }

  export type PokemonCounterUncheckedCreateNestedManyWithoutTargetPokemonInput = {
    create?: XOR<PokemonCounterCreateWithoutTargetPokemonInput, PokemonCounterUncheckedCreateWithoutTargetPokemonInput> | PokemonCounterCreateWithoutTargetPokemonInput[] | PokemonCounterUncheckedCreateWithoutTargetPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutTargetPokemonInput | PokemonCounterCreateOrConnectWithoutTargetPokemonInput[]
    createMany?: PokemonCounterCreateManyTargetPokemonInputEnvelope
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
  }

  export type PokemonCounterUncheckedCreateNestedManyWithoutCounterPokemonInput = {
    create?: XOR<PokemonCounterCreateWithoutCounterPokemonInput, PokemonCounterUncheckedCreateWithoutCounterPokemonInput> | PokemonCounterCreateWithoutCounterPokemonInput[] | PokemonCounterUncheckedCreateWithoutCounterPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutCounterPokemonInput | PokemonCounterCreateOrConnectWithoutCounterPokemonInput[]
    createMany?: PokemonCounterCreateManyCounterPokemonInputEnvelope
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PokemonStatUpdateManyWithoutPokemonNestedInput = {
    create?: XOR<PokemonStatCreateWithoutPokemonInput, PokemonStatUncheckedCreateWithoutPokemonInput> | PokemonStatCreateWithoutPokemonInput[] | PokemonStatUncheckedCreateWithoutPokemonInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutPokemonInput | PokemonStatCreateOrConnectWithoutPokemonInput[]
    upsert?: PokemonStatUpsertWithWhereUniqueWithoutPokemonInput | PokemonStatUpsertWithWhereUniqueWithoutPokemonInput[]
    createMany?: PokemonStatCreateManyPokemonInputEnvelope
    set?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    disconnect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    delete?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    update?: PokemonStatUpdateWithWhereUniqueWithoutPokemonInput | PokemonStatUpdateWithWhereUniqueWithoutPokemonInput[]
    updateMany?: PokemonStatUpdateManyWithWhereWithoutPokemonInput | PokemonStatUpdateManyWithWhereWithoutPokemonInput[]
    deleteMany?: PokemonStatScalarWhereInput | PokemonStatScalarWhereInput[]
  }

  export type PokemonCounterUpdateManyWithoutTargetPokemonNestedInput = {
    create?: XOR<PokemonCounterCreateWithoutTargetPokemonInput, PokemonCounterUncheckedCreateWithoutTargetPokemonInput> | PokemonCounterCreateWithoutTargetPokemonInput[] | PokemonCounterUncheckedCreateWithoutTargetPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutTargetPokemonInput | PokemonCounterCreateOrConnectWithoutTargetPokemonInput[]
    upsert?: PokemonCounterUpsertWithWhereUniqueWithoutTargetPokemonInput | PokemonCounterUpsertWithWhereUniqueWithoutTargetPokemonInput[]
    createMany?: PokemonCounterCreateManyTargetPokemonInputEnvelope
    set?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    disconnect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    delete?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    update?: PokemonCounterUpdateWithWhereUniqueWithoutTargetPokemonInput | PokemonCounterUpdateWithWhereUniqueWithoutTargetPokemonInput[]
    updateMany?: PokemonCounterUpdateManyWithWhereWithoutTargetPokemonInput | PokemonCounterUpdateManyWithWhereWithoutTargetPokemonInput[]
    deleteMany?: PokemonCounterScalarWhereInput | PokemonCounterScalarWhereInput[]
  }

  export type PokemonCounterUpdateManyWithoutCounterPokemonNestedInput = {
    create?: XOR<PokemonCounterCreateWithoutCounterPokemonInput, PokemonCounterUncheckedCreateWithoutCounterPokemonInput> | PokemonCounterCreateWithoutCounterPokemonInput[] | PokemonCounterUncheckedCreateWithoutCounterPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutCounterPokemonInput | PokemonCounterCreateOrConnectWithoutCounterPokemonInput[]
    upsert?: PokemonCounterUpsertWithWhereUniqueWithoutCounterPokemonInput | PokemonCounterUpsertWithWhereUniqueWithoutCounterPokemonInput[]
    createMany?: PokemonCounterCreateManyCounterPokemonInputEnvelope
    set?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    disconnect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    delete?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    update?: PokemonCounterUpdateWithWhereUniqueWithoutCounterPokemonInput | PokemonCounterUpdateWithWhereUniqueWithoutCounterPokemonInput[]
    updateMany?: PokemonCounterUpdateManyWithWhereWithoutCounterPokemonInput | PokemonCounterUpdateManyWithWhereWithoutCounterPokemonInput[]
    deleteMany?: PokemonCounterScalarWhereInput | PokemonCounterScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PokemonStatUncheckedUpdateManyWithoutPokemonNestedInput = {
    create?: XOR<PokemonStatCreateWithoutPokemonInput, PokemonStatUncheckedCreateWithoutPokemonInput> | PokemonStatCreateWithoutPokemonInput[] | PokemonStatUncheckedCreateWithoutPokemonInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutPokemonInput | PokemonStatCreateOrConnectWithoutPokemonInput[]
    upsert?: PokemonStatUpsertWithWhereUniqueWithoutPokemonInput | PokemonStatUpsertWithWhereUniqueWithoutPokemonInput[]
    createMany?: PokemonStatCreateManyPokemonInputEnvelope
    set?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    disconnect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    delete?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    update?: PokemonStatUpdateWithWhereUniqueWithoutPokemonInput | PokemonStatUpdateWithWhereUniqueWithoutPokemonInput[]
    updateMany?: PokemonStatUpdateManyWithWhereWithoutPokemonInput | PokemonStatUpdateManyWithWhereWithoutPokemonInput[]
    deleteMany?: PokemonStatScalarWhereInput | PokemonStatScalarWhereInput[]
  }

  export type PokemonCounterUncheckedUpdateManyWithoutTargetPokemonNestedInput = {
    create?: XOR<PokemonCounterCreateWithoutTargetPokemonInput, PokemonCounterUncheckedCreateWithoutTargetPokemonInput> | PokemonCounterCreateWithoutTargetPokemonInput[] | PokemonCounterUncheckedCreateWithoutTargetPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutTargetPokemonInput | PokemonCounterCreateOrConnectWithoutTargetPokemonInput[]
    upsert?: PokemonCounterUpsertWithWhereUniqueWithoutTargetPokemonInput | PokemonCounterUpsertWithWhereUniqueWithoutTargetPokemonInput[]
    createMany?: PokemonCounterCreateManyTargetPokemonInputEnvelope
    set?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    disconnect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    delete?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    update?: PokemonCounterUpdateWithWhereUniqueWithoutTargetPokemonInput | PokemonCounterUpdateWithWhereUniqueWithoutTargetPokemonInput[]
    updateMany?: PokemonCounterUpdateManyWithWhereWithoutTargetPokemonInput | PokemonCounterUpdateManyWithWhereWithoutTargetPokemonInput[]
    deleteMany?: PokemonCounterScalarWhereInput | PokemonCounterScalarWhereInput[]
  }

  export type PokemonCounterUncheckedUpdateManyWithoutCounterPokemonNestedInput = {
    create?: XOR<PokemonCounterCreateWithoutCounterPokemonInput, PokemonCounterUncheckedCreateWithoutCounterPokemonInput> | PokemonCounterCreateWithoutCounterPokemonInput[] | PokemonCounterUncheckedCreateWithoutCounterPokemonInput[]
    connectOrCreate?: PokemonCounterCreateOrConnectWithoutCounterPokemonInput | PokemonCounterCreateOrConnectWithoutCounterPokemonInput[]
    upsert?: PokemonCounterUpsertWithWhereUniqueWithoutCounterPokemonInput | PokemonCounterUpsertWithWhereUniqueWithoutCounterPokemonInput[]
    createMany?: PokemonCounterCreateManyCounterPokemonInputEnvelope
    set?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    disconnect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    delete?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    connect?: PokemonCounterWhereUniqueInput | PokemonCounterWhereUniqueInput[]
    update?: PokemonCounterUpdateWithWhereUniqueWithoutCounterPokemonInput | PokemonCounterUpdateWithWhereUniqueWithoutCounterPokemonInput[]
    updateMany?: PokemonCounterUpdateManyWithWhereWithoutCounterPokemonInput | PokemonCounterUpdateManyWithWhereWithoutCounterPokemonInput[]
    deleteMany?: PokemonCounterScalarWhereInput | PokemonCounterScalarWhereInput[]
  }

  export type PokemonStatCreateNestedManyWithoutStatInput = {
    create?: XOR<PokemonStatCreateWithoutStatInput, PokemonStatUncheckedCreateWithoutStatInput> | PokemonStatCreateWithoutStatInput[] | PokemonStatUncheckedCreateWithoutStatInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutStatInput | PokemonStatCreateOrConnectWithoutStatInput[]
    createMany?: PokemonStatCreateManyStatInputEnvelope
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
  }

  export type PokemonStatUncheckedCreateNestedManyWithoutStatInput = {
    create?: XOR<PokemonStatCreateWithoutStatInput, PokemonStatUncheckedCreateWithoutStatInput> | PokemonStatCreateWithoutStatInput[] | PokemonStatUncheckedCreateWithoutStatInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutStatInput | PokemonStatCreateOrConnectWithoutStatInput[]
    createMany?: PokemonStatCreateManyStatInputEnvelope
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
  }

  export type PokemonStatUpdateManyWithoutStatNestedInput = {
    create?: XOR<PokemonStatCreateWithoutStatInput, PokemonStatUncheckedCreateWithoutStatInput> | PokemonStatCreateWithoutStatInput[] | PokemonStatUncheckedCreateWithoutStatInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutStatInput | PokemonStatCreateOrConnectWithoutStatInput[]
    upsert?: PokemonStatUpsertWithWhereUniqueWithoutStatInput | PokemonStatUpsertWithWhereUniqueWithoutStatInput[]
    createMany?: PokemonStatCreateManyStatInputEnvelope
    set?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    disconnect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    delete?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    update?: PokemonStatUpdateWithWhereUniqueWithoutStatInput | PokemonStatUpdateWithWhereUniqueWithoutStatInput[]
    updateMany?: PokemonStatUpdateManyWithWhereWithoutStatInput | PokemonStatUpdateManyWithWhereWithoutStatInput[]
    deleteMany?: PokemonStatScalarWhereInput | PokemonStatScalarWhereInput[]
  }

  export type PokemonStatUncheckedUpdateManyWithoutStatNestedInput = {
    create?: XOR<PokemonStatCreateWithoutStatInput, PokemonStatUncheckedCreateWithoutStatInput> | PokemonStatCreateWithoutStatInput[] | PokemonStatUncheckedCreateWithoutStatInput[]
    connectOrCreate?: PokemonStatCreateOrConnectWithoutStatInput | PokemonStatCreateOrConnectWithoutStatInput[]
    upsert?: PokemonStatUpsertWithWhereUniqueWithoutStatInput | PokemonStatUpsertWithWhereUniqueWithoutStatInput[]
    createMany?: PokemonStatCreateManyStatInputEnvelope
    set?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    disconnect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    delete?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    connect?: PokemonStatWhereUniqueInput | PokemonStatWhereUniqueInput[]
    update?: PokemonStatUpdateWithWhereUniqueWithoutStatInput | PokemonStatUpdateWithWhereUniqueWithoutStatInput[]
    updateMany?: PokemonStatUpdateManyWithWhereWithoutStatInput | PokemonStatUpdateManyWithWhereWithoutStatInput[]
    deleteMany?: PokemonStatScalarWhereInput | PokemonStatScalarWhereInput[]
  }

  export type PokemonCreateNestedOneWithoutStatsInput = {
    create?: XOR<PokemonCreateWithoutStatsInput, PokemonUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PokemonCreateOrConnectWithoutStatsInput
    connect?: PokemonWhereUniqueInput
  }

  export type StatCreateNestedOneWithoutPokemonStatsInput = {
    create?: XOR<StatCreateWithoutPokemonStatsInput, StatUncheckedCreateWithoutPokemonStatsInput>
    connectOrCreate?: StatCreateOrConnectWithoutPokemonStatsInput
    connect?: StatWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PokemonUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<PokemonCreateWithoutStatsInput, PokemonUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PokemonCreateOrConnectWithoutStatsInput
    upsert?: PokemonUpsertWithoutStatsInput
    connect?: PokemonWhereUniqueInput
    update?: XOR<XOR<PokemonUpdateToOneWithWhereWithoutStatsInput, PokemonUpdateWithoutStatsInput>, PokemonUncheckedUpdateWithoutStatsInput>
  }

  export type StatUpdateOneRequiredWithoutPokemonStatsNestedInput = {
    create?: XOR<StatCreateWithoutPokemonStatsInput, StatUncheckedCreateWithoutPokemonStatsInput>
    connectOrCreate?: StatCreateOrConnectWithoutPokemonStatsInput
    upsert?: StatUpsertWithoutPokemonStatsInput
    connect?: StatWhereUniqueInput
    update?: XOR<XOR<StatUpdateToOneWithWhereWithoutPokemonStatsInput, StatUpdateWithoutPokemonStatsInput>, StatUncheckedUpdateWithoutPokemonStatsInput>
  }

  export type PokemonCreateNestedOneWithoutTargetOfInput = {
    create?: XOR<PokemonCreateWithoutTargetOfInput, PokemonUncheckedCreateWithoutTargetOfInput>
    connectOrCreate?: PokemonCreateOrConnectWithoutTargetOfInput
    connect?: PokemonWhereUniqueInput
  }

  export type PokemonCreateNestedOneWithoutCounterForInput = {
    create?: XOR<PokemonCreateWithoutCounterForInput, PokemonUncheckedCreateWithoutCounterForInput>
    connectOrCreate?: PokemonCreateOrConnectWithoutCounterForInput
    connect?: PokemonWhereUniqueInput
  }

  export type PokemonUpdateOneRequiredWithoutTargetOfNestedInput = {
    create?: XOR<PokemonCreateWithoutTargetOfInput, PokemonUncheckedCreateWithoutTargetOfInput>
    connectOrCreate?: PokemonCreateOrConnectWithoutTargetOfInput
    upsert?: PokemonUpsertWithoutTargetOfInput
    connect?: PokemonWhereUniqueInput
    update?: XOR<XOR<PokemonUpdateToOneWithWhereWithoutTargetOfInput, PokemonUpdateWithoutTargetOfInput>, PokemonUncheckedUpdateWithoutTargetOfInput>
  }

  export type PokemonUpdateOneRequiredWithoutCounterForNestedInput = {
    create?: XOR<PokemonCreateWithoutCounterForInput, PokemonUncheckedCreateWithoutCounterForInput>
    connectOrCreate?: PokemonCreateOrConnectWithoutCounterForInput
    upsert?: PokemonUpsertWithoutCounterForInput
    connect?: PokemonWhereUniqueInput
    update?: XOR<XOR<PokemonUpdateToOneWithWhereWithoutCounterForInput, PokemonUpdateWithoutCounterForInput>, PokemonUncheckedUpdateWithoutCounterForInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PokemonStatCreateWithoutPokemonInput = {
    level: number
    value: number
    stat: StatCreateNestedOneWithoutPokemonStatsInput
  }

  export type PokemonStatUncheckedCreateWithoutPokemonInput = {
    id?: number
    statId: number
    level: number
    value: number
  }

  export type PokemonStatCreateOrConnectWithoutPokemonInput = {
    where: PokemonStatWhereUniqueInput
    create: XOR<PokemonStatCreateWithoutPokemonInput, PokemonStatUncheckedCreateWithoutPokemonInput>
  }

  export type PokemonStatCreateManyPokemonInputEnvelope = {
    data: PokemonStatCreateManyPokemonInput | PokemonStatCreateManyPokemonInput[]
    skipDuplicates?: boolean
  }

  export type PokemonCounterCreateWithoutTargetPokemonInput = {
    reason?: string | null
    upvotes?: number
    downvotes?: number
    counterPokemon: PokemonCreateNestedOneWithoutCounterForInput
  }

  export type PokemonCounterUncheckedCreateWithoutTargetPokemonInput = {
    id?: number
    counterPokemonId: number
    reason?: string | null
    upvotes?: number
    downvotes?: number
  }

  export type PokemonCounterCreateOrConnectWithoutTargetPokemonInput = {
    where: PokemonCounterWhereUniqueInput
    create: XOR<PokemonCounterCreateWithoutTargetPokemonInput, PokemonCounterUncheckedCreateWithoutTargetPokemonInput>
  }

  export type PokemonCounterCreateManyTargetPokemonInputEnvelope = {
    data: PokemonCounterCreateManyTargetPokemonInput | PokemonCounterCreateManyTargetPokemonInput[]
    skipDuplicates?: boolean
  }

  export type PokemonCounterCreateWithoutCounterPokemonInput = {
    reason?: string | null
    upvotes?: number
    downvotes?: number
    targetPokemon: PokemonCreateNestedOneWithoutTargetOfInput
  }

  export type PokemonCounterUncheckedCreateWithoutCounterPokemonInput = {
    id?: number
    targetPokemonId: number
    reason?: string | null
    upvotes?: number
    downvotes?: number
  }

  export type PokemonCounterCreateOrConnectWithoutCounterPokemonInput = {
    where: PokemonCounterWhereUniqueInput
    create: XOR<PokemonCounterCreateWithoutCounterPokemonInput, PokemonCounterUncheckedCreateWithoutCounterPokemonInput>
  }

  export type PokemonCounterCreateManyCounterPokemonInputEnvelope = {
    data: PokemonCounterCreateManyCounterPokemonInput | PokemonCounterCreateManyCounterPokemonInput[]
    skipDuplicates?: boolean
  }

  export type PokemonStatUpsertWithWhereUniqueWithoutPokemonInput = {
    where: PokemonStatWhereUniqueInput
    update: XOR<PokemonStatUpdateWithoutPokemonInput, PokemonStatUncheckedUpdateWithoutPokemonInput>
    create: XOR<PokemonStatCreateWithoutPokemonInput, PokemonStatUncheckedCreateWithoutPokemonInput>
  }

  export type PokemonStatUpdateWithWhereUniqueWithoutPokemonInput = {
    where: PokemonStatWhereUniqueInput
    data: XOR<PokemonStatUpdateWithoutPokemonInput, PokemonStatUncheckedUpdateWithoutPokemonInput>
  }

  export type PokemonStatUpdateManyWithWhereWithoutPokemonInput = {
    where: PokemonStatScalarWhereInput
    data: XOR<PokemonStatUpdateManyMutationInput, PokemonStatUncheckedUpdateManyWithoutPokemonInput>
  }

  export type PokemonStatScalarWhereInput = {
    AND?: PokemonStatScalarWhereInput | PokemonStatScalarWhereInput[]
    OR?: PokemonStatScalarWhereInput[]
    NOT?: PokemonStatScalarWhereInput | PokemonStatScalarWhereInput[]
    id?: IntFilter<"PokemonStat"> | number
    pokemonId?: IntFilter<"PokemonStat"> | number
    statId?: IntFilter<"PokemonStat"> | number
    level?: IntFilter<"PokemonStat"> | number
    value?: FloatFilter<"PokemonStat"> | number
  }

  export type PokemonCounterUpsertWithWhereUniqueWithoutTargetPokemonInput = {
    where: PokemonCounterWhereUniqueInput
    update: XOR<PokemonCounterUpdateWithoutTargetPokemonInput, PokemonCounterUncheckedUpdateWithoutTargetPokemonInput>
    create: XOR<PokemonCounterCreateWithoutTargetPokemonInput, PokemonCounterUncheckedCreateWithoutTargetPokemonInput>
  }

  export type PokemonCounterUpdateWithWhereUniqueWithoutTargetPokemonInput = {
    where: PokemonCounterWhereUniqueInput
    data: XOR<PokemonCounterUpdateWithoutTargetPokemonInput, PokemonCounterUncheckedUpdateWithoutTargetPokemonInput>
  }

  export type PokemonCounterUpdateManyWithWhereWithoutTargetPokemonInput = {
    where: PokemonCounterScalarWhereInput
    data: XOR<PokemonCounterUpdateManyMutationInput, PokemonCounterUncheckedUpdateManyWithoutTargetPokemonInput>
  }

  export type PokemonCounterScalarWhereInput = {
    AND?: PokemonCounterScalarWhereInput | PokemonCounterScalarWhereInput[]
    OR?: PokemonCounterScalarWhereInput[]
    NOT?: PokemonCounterScalarWhereInput | PokemonCounterScalarWhereInput[]
    id?: IntFilter<"PokemonCounter"> | number
    targetPokemonId?: IntFilter<"PokemonCounter"> | number
    counterPokemonId?: IntFilter<"PokemonCounter"> | number
    reason?: StringNullableFilter<"PokemonCounter"> | string | null
    upvotes?: IntFilter<"PokemonCounter"> | number
    downvotes?: IntFilter<"PokemonCounter"> | number
  }

  export type PokemonCounterUpsertWithWhereUniqueWithoutCounterPokemonInput = {
    where: PokemonCounterWhereUniqueInput
    update: XOR<PokemonCounterUpdateWithoutCounterPokemonInput, PokemonCounterUncheckedUpdateWithoutCounterPokemonInput>
    create: XOR<PokemonCounterCreateWithoutCounterPokemonInput, PokemonCounterUncheckedCreateWithoutCounterPokemonInput>
  }

  export type PokemonCounterUpdateWithWhereUniqueWithoutCounterPokemonInput = {
    where: PokemonCounterWhereUniqueInput
    data: XOR<PokemonCounterUpdateWithoutCounterPokemonInput, PokemonCounterUncheckedUpdateWithoutCounterPokemonInput>
  }

  export type PokemonCounterUpdateManyWithWhereWithoutCounterPokemonInput = {
    where: PokemonCounterScalarWhereInput
    data: XOR<PokemonCounterUpdateManyMutationInput, PokemonCounterUncheckedUpdateManyWithoutCounterPokemonInput>
  }

  export type PokemonStatCreateWithoutStatInput = {
    level: number
    value: number
    pokemon: PokemonCreateNestedOneWithoutStatsInput
  }

  export type PokemonStatUncheckedCreateWithoutStatInput = {
    id?: number
    pokemonId: number
    level: number
    value: number
  }

  export type PokemonStatCreateOrConnectWithoutStatInput = {
    where: PokemonStatWhereUniqueInput
    create: XOR<PokemonStatCreateWithoutStatInput, PokemonStatUncheckedCreateWithoutStatInput>
  }

  export type PokemonStatCreateManyStatInputEnvelope = {
    data: PokemonStatCreateManyStatInput | PokemonStatCreateManyStatInput[]
    skipDuplicates?: boolean
  }

  export type PokemonStatUpsertWithWhereUniqueWithoutStatInput = {
    where: PokemonStatWhereUniqueInput
    update: XOR<PokemonStatUpdateWithoutStatInput, PokemonStatUncheckedUpdateWithoutStatInput>
    create: XOR<PokemonStatCreateWithoutStatInput, PokemonStatUncheckedCreateWithoutStatInput>
  }

  export type PokemonStatUpdateWithWhereUniqueWithoutStatInput = {
    where: PokemonStatWhereUniqueInput
    data: XOR<PokemonStatUpdateWithoutStatInput, PokemonStatUncheckedUpdateWithoutStatInput>
  }

  export type PokemonStatUpdateManyWithWhereWithoutStatInput = {
    where: PokemonStatScalarWhereInput
    data: XOR<PokemonStatUpdateManyMutationInput, PokemonStatUncheckedUpdateManyWithoutStatInput>
  }

  export type PokemonCreateWithoutStatsInput = {
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    targetOf?: PokemonCounterCreateNestedManyWithoutTargetPokemonInput
    counterFor?: PokemonCounterCreateNestedManyWithoutCounterPokemonInput
  }

  export type PokemonUncheckedCreateWithoutStatsInput = {
    id?: number
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    targetOf?: PokemonCounterUncheckedCreateNestedManyWithoutTargetPokemonInput
    counterFor?: PokemonCounterUncheckedCreateNestedManyWithoutCounterPokemonInput
  }

  export type PokemonCreateOrConnectWithoutStatsInput = {
    where: PokemonWhereUniqueInput
    create: XOR<PokemonCreateWithoutStatsInput, PokemonUncheckedCreateWithoutStatsInput>
  }

  export type StatCreateWithoutPokemonStatsInput = {
    name: string
  }

  export type StatUncheckedCreateWithoutPokemonStatsInput = {
    id?: number
    name: string
  }

  export type StatCreateOrConnectWithoutPokemonStatsInput = {
    where: StatWhereUniqueInput
    create: XOR<StatCreateWithoutPokemonStatsInput, StatUncheckedCreateWithoutPokemonStatsInput>
  }

  export type PokemonUpsertWithoutStatsInput = {
    update: XOR<PokemonUpdateWithoutStatsInput, PokemonUncheckedUpdateWithoutStatsInput>
    create: XOR<PokemonCreateWithoutStatsInput, PokemonUncheckedCreateWithoutStatsInput>
    where?: PokemonWhereInput
  }

  export type PokemonUpdateToOneWithWhereWithoutStatsInput = {
    where?: PokemonWhereInput
    data: XOR<PokemonUpdateWithoutStatsInput, PokemonUncheckedUpdateWithoutStatsInput>
  }

  export type PokemonUpdateWithoutStatsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetOf?: PokemonCounterUpdateManyWithoutTargetPokemonNestedInput
    counterFor?: PokemonCounterUpdateManyWithoutCounterPokemonNestedInput
  }

  export type PokemonUncheckedUpdateWithoutStatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetOf?: PokemonCounterUncheckedUpdateManyWithoutTargetPokemonNestedInput
    counterFor?: PokemonCounterUncheckedUpdateManyWithoutCounterPokemonNestedInput
  }

  export type StatUpsertWithoutPokemonStatsInput = {
    update: XOR<StatUpdateWithoutPokemonStatsInput, StatUncheckedUpdateWithoutPokemonStatsInput>
    create: XOR<StatCreateWithoutPokemonStatsInput, StatUncheckedCreateWithoutPokemonStatsInput>
    where?: StatWhereInput
  }

  export type StatUpdateToOneWithWhereWithoutPokemonStatsInput = {
    where?: StatWhereInput
    data: XOR<StatUpdateWithoutPokemonStatsInput, StatUncheckedUpdateWithoutPokemonStatsInput>
  }

  export type StatUpdateWithoutPokemonStatsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StatUncheckedUpdateWithoutPokemonStatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PokemonCreateWithoutTargetOfInput = {
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: PokemonStatCreateNestedManyWithoutPokemonInput
    counterFor?: PokemonCounterCreateNestedManyWithoutCounterPokemonInput
  }

  export type PokemonUncheckedCreateWithoutTargetOfInput = {
    id?: number
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: PokemonStatUncheckedCreateNestedManyWithoutPokemonInput
    counterFor?: PokemonCounterUncheckedCreateNestedManyWithoutCounterPokemonInput
  }

  export type PokemonCreateOrConnectWithoutTargetOfInput = {
    where: PokemonWhereUniqueInput
    create: XOR<PokemonCreateWithoutTargetOfInput, PokemonUncheckedCreateWithoutTargetOfInput>
  }

  export type PokemonCreateWithoutCounterForInput = {
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: PokemonStatCreateNestedManyWithoutPokemonInput
    targetOf?: PokemonCounterCreateNestedManyWithoutTargetPokemonInput
  }

  export type PokemonUncheckedCreateWithoutCounterForInput = {
    id?: number
    slug: string
    nameJa: string
    nameEn: string
    damageClass: string
    rangeType: string
    battleStyle: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: PokemonStatUncheckedCreateNestedManyWithoutPokemonInput
    targetOf?: PokemonCounterUncheckedCreateNestedManyWithoutTargetPokemonInput
  }

  export type PokemonCreateOrConnectWithoutCounterForInput = {
    where: PokemonWhereUniqueInput
    create: XOR<PokemonCreateWithoutCounterForInput, PokemonUncheckedCreateWithoutCounterForInput>
  }

  export type PokemonUpsertWithoutTargetOfInput = {
    update: XOR<PokemonUpdateWithoutTargetOfInput, PokemonUncheckedUpdateWithoutTargetOfInput>
    create: XOR<PokemonCreateWithoutTargetOfInput, PokemonUncheckedCreateWithoutTargetOfInput>
    where?: PokemonWhereInput
  }

  export type PokemonUpdateToOneWithWhereWithoutTargetOfInput = {
    where?: PokemonWhereInput
    data: XOR<PokemonUpdateWithoutTargetOfInput, PokemonUncheckedUpdateWithoutTargetOfInput>
  }

  export type PokemonUpdateWithoutTargetOfInput = {
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PokemonStatUpdateManyWithoutPokemonNestedInput
    counterFor?: PokemonCounterUpdateManyWithoutCounterPokemonNestedInput
  }

  export type PokemonUncheckedUpdateWithoutTargetOfInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PokemonStatUncheckedUpdateManyWithoutPokemonNestedInput
    counterFor?: PokemonCounterUncheckedUpdateManyWithoutCounterPokemonNestedInput
  }

  export type PokemonUpsertWithoutCounterForInput = {
    update: XOR<PokemonUpdateWithoutCounterForInput, PokemonUncheckedUpdateWithoutCounterForInput>
    create: XOR<PokemonCreateWithoutCounterForInput, PokemonUncheckedCreateWithoutCounterForInput>
    where?: PokemonWhereInput
  }

  export type PokemonUpdateToOneWithWhereWithoutCounterForInput = {
    where?: PokemonWhereInput
    data: XOR<PokemonUpdateWithoutCounterForInput, PokemonUncheckedUpdateWithoutCounterForInput>
  }

  export type PokemonUpdateWithoutCounterForInput = {
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PokemonStatUpdateManyWithoutPokemonNestedInput
    targetOf?: PokemonCounterUpdateManyWithoutTargetPokemonNestedInput
  }

  export type PokemonUncheckedUpdateWithoutCounterForInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    nameJa?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    damageClass?: StringFieldUpdateOperationsInput | string
    rangeType?: StringFieldUpdateOperationsInput | string
    battleStyle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PokemonStatUncheckedUpdateManyWithoutPokemonNestedInput
    targetOf?: PokemonCounterUncheckedUpdateManyWithoutTargetPokemonNestedInput
  }

  export type PokemonStatCreateManyPokemonInput = {
    id?: number
    statId: number
    level: number
    value: number
  }

  export type PokemonCounterCreateManyTargetPokemonInput = {
    id?: number
    counterPokemonId: number
    reason?: string | null
    upvotes?: number
    downvotes?: number
  }

  export type PokemonCounterCreateManyCounterPokemonInput = {
    id?: number
    targetPokemonId: number
    reason?: string | null
    upvotes?: number
    downvotes?: number
  }

  export type PokemonStatUpdateWithoutPokemonInput = {
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    stat?: StatUpdateOneRequiredWithoutPokemonStatsNestedInput
  }

  export type PokemonStatUncheckedUpdateWithoutPokemonInput = {
    id?: IntFieldUpdateOperationsInput | number
    statId?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type PokemonStatUncheckedUpdateManyWithoutPokemonInput = {
    id?: IntFieldUpdateOperationsInput | number
    statId?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type PokemonCounterUpdateWithoutTargetPokemonInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
    counterPokemon?: PokemonUpdateOneRequiredWithoutCounterForNestedInput
  }

  export type PokemonCounterUncheckedUpdateWithoutTargetPokemonInput = {
    id?: IntFieldUpdateOperationsInput | number
    counterPokemonId?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
  }

  export type PokemonCounterUncheckedUpdateManyWithoutTargetPokemonInput = {
    id?: IntFieldUpdateOperationsInput | number
    counterPokemonId?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
  }

  export type PokemonCounterUpdateWithoutCounterPokemonInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
    targetPokemon?: PokemonUpdateOneRequiredWithoutTargetOfNestedInput
  }

  export type PokemonCounterUncheckedUpdateWithoutCounterPokemonInput = {
    id?: IntFieldUpdateOperationsInput | number
    targetPokemonId?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
  }

  export type PokemonCounterUncheckedUpdateManyWithoutCounterPokemonInput = {
    id?: IntFieldUpdateOperationsInput | number
    targetPokemonId?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    upvotes?: IntFieldUpdateOperationsInput | number
    downvotes?: IntFieldUpdateOperationsInput | number
  }

  export type PokemonStatCreateManyStatInput = {
    id?: number
    pokemonId: number
    level: number
    value: number
  }

  export type PokemonStatUpdateWithoutStatInput = {
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    pokemon?: PokemonUpdateOneRequiredWithoutStatsNestedInput
  }

  export type PokemonStatUncheckedUpdateWithoutStatInput = {
    id?: IntFieldUpdateOperationsInput | number
    pokemonId?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type PokemonStatUncheckedUpdateManyWithoutStatInput = {
    id?: IntFieldUpdateOperationsInput | number
    pokemonId?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}