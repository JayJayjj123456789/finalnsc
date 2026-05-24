import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={"animate-pulse bg-gray-200 rounded " + className} />;
}

export function RouteCardSkeleton() {
  return (
    <div className="glass-panel rounded-xl p-5 space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Skeleton className="h-10 w-72" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouteCardSkeleton />
        <RouteCardSkeleton />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}