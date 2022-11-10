import React from "react";

const TodoSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-slate-900/10 dark:bg-slate-50/10 rounded px-3">
        <div className="flex gap-2 py-4 items-stretch">
          <div className="w-8/12 h-4 rounded-sm bg-slate-900/10 dark:bg-slate-50/20"></div>
          <div className="flex-1 w-full h-4 rounded-sm bg-slate-900/10 dark:bg-slate-50/20"></div>
        </div>
      </div>
    </div>
  );
};

export default TodoSkeleton;
