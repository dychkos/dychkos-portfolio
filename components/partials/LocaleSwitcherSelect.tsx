"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/lib/navigation";
import Body1 from "@/components/ui/typography/Body1";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={clsx(
        "relative text-gray-900 dark:text-gray-100 flex flex-row items-center justify-between w-full md:w-auto",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <Body1 className="md:hidden">{label}</Body1>
      <select
        className="inline-flex cursor-pointer appearance-none bg-transparent py-2 pl-2 pr-6 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-1 top-[8px]">▼</span>
    </label>
  );
}
