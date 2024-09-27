import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import * as React from "react";

import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  CalendarDays,
  CheckIcon,
  SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { DateRange } from "react-day-picker";

const TableToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between", className)}
    {...props}
  >
    <div className="flex flex-1 items-center space-x-2">{children}</div>
  </div>
));

TableToolbar.displayName = "TableToolbar";

const TableToolbarSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <SearchIcon strokeWidth={3} size={16} className="text-mimoo-purple-600" />
      <input
        {...props}
        ref={ref}
        className="w-full p-2 placeholder:text-mimoo-purple-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-mimoo-purple-800"
      />
    </div>
  )
);

TableToolbarSearch.displayName = "TableToolbarSearch";

const TableToolbarFilter = Popover;

type TableToolbarFilterOptionsProps = React.PropsWithChildren & {
  title: string;
};
const TableToolbarFilterOptions = (props: TableToolbarFilterOptionsProps) => (
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      size="sm"
      className="h-10 px-2 border-solid border-input hover:bg-background"
    >
      <SlidersHorizontal className="mr-2 h-4 w-4 text-mimoo-purple-800" />
      <p className="text-mimoo-purple-800 font-normal">{props.title}</p>
      {props?.children && (
        <>
          <Separator orientation="vertical" className="mx-3 h-4" />
          {props.children}
        </>
      )}
    </Button>
  </PopoverTrigger>
);

TableToolbarFilterOptions.displayName = "TableToolbarFilterOptions";

type TableToorbalFilterOptionItemProps = React.PropsWithChildren & BadgeProps;

const TableToorbalFilterOptionItem = ({
  className,
  children,
  ...props
}: TableToorbalFilterOptionItemProps) => (
  <Badge
    variant="secondary"
    className={cn(
      "rounded-md px-1 font-normal bg-mimoo-purple-100 text-mimoo-purple-600 hover:bg-mimoo-purple-200 hover:text-mimoo-purple-700 capitalize",
      className
    )}
    {...props}
  >
    {children}
  </Badge>
);

type TableToolbarFilterContentProps = React.PropsWithChildren & {
  title: string;
};
const TableToolbarFilterContent = (props: TableToolbarFilterContentProps) => (
  <PopoverContent className="w-[200px] p-0" align="start">
    <Command>
      <CommandList>
        <CommandGroup>{props.children}</CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
);

type TableToolbarFilterContentItemProps = React.PropsWithChildren & {
  value?: string;
  isSelected: boolean;
  onSelect?: (value: string) => void;
};
const TableToolbarFilterContentItem = (
  props: TableToolbarFilterContentItemProps
) => (
  <CommandItem
    value={props.value}
    onSelect={props.onSelect}
    className="cursor-pointer"
  >
    <div
      className={cn(
        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-mimoo-purple-700",
        props.isSelected
          ? "bg-mimoo-purple-700 text-primary-foreground"
          : "opacity-50 [&_svg]:invisible"
      )}
    >
      <CheckIcon className={cn("h-4 w-4")} />
    </div>
    <span className="capitalize">{props.children}</span>
  </CommandItem>
);

const TableToolbarFilterClear = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    className={cn("h-8 px-2 lg:px-3 font-normal", className)}
    {...props}
  >
    <X className="mr-2 h-4 w-4" />
    Limpar
  </Button>
));

TableToolbarFilterClear.displayName = "TableToolbarFilterClear";

const TableToolbarBigNumberItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => (
  <div
    ref={ref}
    className="flex py-1 px-2 rounded-md bg-mimoo-purple-100 text-sm text-mimoo-purple-500 whitespace-nowrap font-normal"
  >
    {children}
  </div>
));

TableToolbarBigNumberItem.displayName = "TableToolbarBigNumberItem";

const TableToolbarBigNumbers = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-baseline gap-x-3", className)}
    {...props}
  />
));

TableToolbarBigNumbers.displayName = "TableToolbarBigNumbers";

type TableToolbarDatePickerProps = {
  date: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
};

const TableToolbarDatePicker = (props: TableToolbarDatePickerProps) => {
  function formatText() {
    if (!props.date) return "Selecione um período";
    if (props.date.from && props.date.to) {
      return [
        format(props.date.from, "dd/MM/yyyy"),
        format(props.date.to, "dd/MM/yyyy"),
      ].join(" - ");
    }
    if (props.date?.from) {
      return format(props.date.from, "dd/MM/yyyy");
    }
    return "Selecione um período";
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 px-2 border-solid border-input hover:bg-background"
        >
          <CalendarDays className="mr-2 h-4 w-4 text-mimoo-purple-800" />
          <p className="text-mimoo-purple-800 font-normal">{formatText()}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={props.date?.from}
          selected={props.date}
          onSelect={props.onSelect}
          locale={pt}
        />
      </PopoverContent>
    </Popover>
  );
};

TableToolbarDatePicker.displayName = "TableToolbarDatePicker";

export {
  TableToolbar,
  TableToolbarBigNumberItem,
  TableToolbarBigNumbers,
  TableToolbarDatePicker,
  TableToolbarFilter,
  TableToolbarFilterClear,
  TableToolbarFilterContent,
  TableToolbarFilterContentItem,
  TableToolbarFilterOptions,
  TableToolbarSearch,
  TableToorbalFilterOptionItem,
};
