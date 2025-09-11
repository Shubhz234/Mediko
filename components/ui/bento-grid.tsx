import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-lg row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-emerald-200 dark:border-white/[0.1] dark:bg-black/50 dark:shadow-none dark:hover:border-emerald-800",
        className,
      )}
    >
      {header}
      <div className="transition-all duration-300 group-hover/bento:translate-x-1">
        <div className="mb-3 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg w-fit">
          {icon}
        </div>
        <div className="mt-2 mb-3 font-sans text-lg font-bold text-slate-800 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-sm font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
