export default function Loading() {
    return (
        <div className="w-full animate-in fade-in duration-500">
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4"></div>

            {/* PokemonInfo Skeleton */}
            <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 md:mb-8">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-200 dark:bg-gray-800 rounded-xl mx-auto md:mx-0 animate-pulse"></div>
                <div className="flex-1 space-y-4">
                    <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="mt-6 md:mt-8 space-y-4">
                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-t-lg animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-t-lg animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-t-lg animate-pulse"></div>
                </div>

                {/* Tab Content Skeleton */}
                <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-b-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="space-y-4">
                        <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                        <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                        <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
