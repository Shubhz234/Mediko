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
        "group/bento shadow-lg row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="transition-all duration-300 group-hover/bento:translate-x-1">
        {icon}
        <div className="mt-3 mb-2 font-sans text-lg font-bold text-slate-800 dark:text-slate-100">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
