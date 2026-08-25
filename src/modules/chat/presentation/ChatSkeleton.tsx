export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      <div className="flex justify-start">
        <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
      <div className="flex justify-end">
        <div className="h-10 w-1/2 bg-blue-200 dark:bg-blue-900 rounded-lg"></div>
      </div>
    </div>
  );
}
