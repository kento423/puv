import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ComboboxProps<T> {
  items: T[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  itemLabel: (item: T) => string;
  itemValue: (item: T) => string;
  className?: string;
}

export function Combobox<T>({
  items,
  selectedValue,
  onSelect,
  placeholder = "選択してください",
  itemLabel,
  itemValue,
  className = "w-[200px]",
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 検索結果をフィルタリング
  const filteredItems = items.filter((item) =>
    itemLabel(item).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${className} justify-between`}
        >
          {selectedValue
            ? itemLabel(items.find((item) => itemValue(item) === selectedValue)!)
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${className} p-0`}>
        <Command>
          <CommandInput
            placeholder="検索..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>該当なし</CommandEmpty>
          <CommandGroup>
            <div className="max-h-60 overflow-y-auto">
              {filteredItems.map((item) => (
                <CommandItem
                  key={itemValue(item)}
                  value={itemValue(item)}
                  onSelect={(val) => {
                    onSelect(val);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === itemValue(item) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {itemLabel(item)}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}