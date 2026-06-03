import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, Check } from "lucide-react";
import { c as cn, B as Button } from "./router-Cxl4vns6.js";
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
const ALL_TAX_YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
const FILING_STATUSES = [
  { value: "single", label: "Single", rate: 0.21 },
  { value: "mfj", label: "Married Filing Jointly", rate: 0.35 },
  { value: "280c", label: "280C", rate: 0.21 }
];
function MultiYearSelect({
  value,
  onToggle,
  onSelectAll,
  onClear,
  placeholder = "Select years",
  className
}) {
  const allSelected = value.length === ALL_TAX_YEARS.length;
  const label = value.length === 0 ? placeholder : allSelected ? "All Years (2020–2026)" : value.length <= 3 ? value.join(", ") : `${value.length} years selected`;
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        className: cn("w-full justify-between font-normal", className),
        children: [
          /* @__PURE__ */ jsx("span", { className: cn("truncate", value.length === 0 && "text-muted-foreground"), children: label }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4 opacity-60" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(PopoverContent, { className: "w-64 p-2", align: "start", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: allSelected ? onClear : onSelectAll,
          className: "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent",
          children: [
            /* @__PURE__ */ jsx("span", { children: allSelected ? "Clear all" : "All Years" }),
            allSelected && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-cyan" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(Separator, { className: "my-1.5" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1", children: ALL_TAX_YEARS.map((y) => {
        const active = value.includes(y);
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => onToggle(y),
            className: cn(
              "flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
              active ? "bg-cyan/10 text-navy font-medium" : "hover:bg-accent"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { children: y }),
              active && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-cyan" })
            ]
          },
          y
        );
      }) })
    ] })
  ] });
}
function YearChips({ years, className }) {
  if (years.length === 0) return /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "—" });
  const isAll = years.length === ALL_TAX_YEARS.length;
  if (isAll) return /* @__PURE__ */ jsx(Badge, { className: "bg-navy text-white hover:bg-navy", children: "All Years" });
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-wrap gap-1", className), children: years.map((y) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-cyan/40 text-navy bg-cyan/5", children: y }, y)) });
}
export {
  ALL_TAX_YEARS as A,
  Badge as B,
  FILING_STATUSES as F,
  MultiYearSelect as M,
  YearChips as Y
};
