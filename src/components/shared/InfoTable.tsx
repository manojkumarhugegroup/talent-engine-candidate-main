"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ListFilter,
  MoreVertical,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TableSkeleton } from "./TableSkeleton"

export type EnhancedColumnDef<T> = ColumnDef<T, any> & {
  field?: string
  width?: number | string
  minWidth?: number
  maxWidth?: number
  resizable?: boolean
  truncate?: boolean
  maxLength?: number
  showTooltip?: boolean
  tooltipContent?: (value: any, row: T) => React.ReactNode
}

// Action menu item interface
export interface ActionMenuItem<T = any> {
  label: string
  onClick: (row: T) => void
  separator?: boolean
}

interface TruncatedCellProps {
  content: React.ReactNode
  maxLength?: number
  showTooltip?: boolean
  tooltipContent?: React.ReactNode
  className?: string
}

function TruncatedCell({ content, maxLength = 50, showTooltip = true, tooltipContent, className }: TruncatedCellProps) {
  const textContent = typeof content === "string" ? content : String(content)
  const shouldTruncate = textContent.length > maxLength
  const truncatedText = shouldTruncate ? `${textContent.slice(0, maxLength)}...` : textContent

  if (!shouldTruncate || !showTooltip) {
    return <div className={cn("truncate", className)}>{content}</div>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("truncate cursor-help", className)}>{truncatedText}</div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          {tooltipContent || textContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Sortable header
export function SortableHeader({
  column,
  label,
  field,
}: {
  column: any
  label: string
  field?: string
}) {
  if (!field || field.trim() === "") {
    return <div className="text-left font-medium truncate">{label}</div>
  }

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-auto p-0 font-medium hover:bg-transparent group justify-start w-full"
    >
      <span className="truncate">{label}</span>
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-3 w-3 flex-shrink-0" size={12} />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-2 h-3 w-3 flex-shrink-0" size={12} />
      ) : (
        <ArrowUpDown
          className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
          size={12}
        />
      )}
    </Button>
  )
}

interface MasterTableProps<T> {
  data: T[]
  columns: EnhancedColumnDef<T>[]
  actionMenuItems?: ActionMenuItem<T>[]
  enableRowSelection?: boolean
  enablePagination?: boolean
  enableSorting?: boolean
  enableFiltering?: boolean
  onRowSelectionChange?: (selectedRows: T[]) => void
  onSortChange?: (orderField: string, orderType: "asc" | "desc" | null) => void
  onFilterInputChange?: (value: string) => void
  onPaginationChange?: (pageIndex: number, pageSize: number) => void
  pageNumber?: number
  orderType: "asc" | "desc" | null
  orderField: string
  pageSize?: number
  totalCount?: number
  pageSizeOptions?: number[]
  stickyStart?: number
  stickyEnd?: number
  showActionColumn?: boolean
  title: string
  loading?: boolean
  tableHeight?: string
  className?: string
  globalMaxLength?: number
  globalShowTooltip?: boolean
}

export default function EnhancedInfoTable<T>({
  data,
  columns,
  actionMenuItems = [],
  enableRowSelection = false,
  enablePagination = true,
  enableSorting = true,
  enableFiltering = true,
  onFilterInputChange,
  onRowSelectionChange,
  onSortChange,
  orderType,
  orderField,
  onPaginationChange,
  pageNumber = 1,
  pageSize = 10,
  totalCount = 0,
  title,
  pageSizeOptions = [10, 20, 30, 40, 50],
  stickyStart = 0,
  stickyEnd = 0,
  showActionColumn,
  loading,
  tableHeight = "auto",
  className,
  globalMaxLength = 50,
  globalShowTooltip = true,
}: MasterTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(
    orderField && orderType ? [{ id: orderField, desc: orderType === "desc" }] : [],
  )
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  // Handle pagination changes
  const handlePaginationChange = (newPageNumber: number, newPageSize: number) => {
    if (onPaginationChange) {
      onPaginationChange(newPageNumber, newPageSize)
    }
  }

  // Handle sorting changes
  const handleSortingChange = (updater: any) => {
    const newSorting = typeof updater === "function" ? updater(sorting) : updater
    setSorting(newSorting)

    if (onSortChange && newSorting.length > 0) {
      const { id, desc } = newSorting[0]
      onSortChange(id, desc ? "desc" : "asc")
    } else if (onSortChange) {
      onSortChange("", null)
    }
  }

  // Calculate column widths
  const calculateColumnWidths = React.useMemo(() => {
    const totalCols =
      columns.length + (enableRowSelection ? 1 : 0) + (showActionColumn && actionMenuItems.length > 0 ? 1 : 0)
    const fixedWidths: Record<number, number | string> = {}
    let totalFixedWidth = 0
    let flexColumns = 0

    // Process base columns
    columns.forEach((col, index) => {
      const colIndex = enableRowSelection ? index + 1 : index
      if (col.width) {
        fixedWidths[colIndex] = typeof col.width === "string" ? col.width : `${col.width}px`
        if (typeof col.width === "number") {
          totalFixedWidth += col.width
        }
      } else {
        flexColumns++
      }
    })

    // Add selection column
    if (enableRowSelection) {
      fixedWidths[0] = "50px"
      totalFixedWidth += 50
    }

    // Add action column
    if (showActionColumn && actionMenuItems.length > 0) {
      const actionIndex = totalCols - 1
      fixedWidths[actionIndex] = "60px"
      totalFixedWidth += 60
    }

    return { fixedWidths, flexColumns, totalFixedWidth }
  }, [columns, enableRowSelection, showActionColumn, actionMenuItems])

  // Build final column set
  const finalColumns = React.useMemo(() => {
    const cols: EnhancedColumnDef<T>[] = []

    if (enableRowSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        width: 50,
      })
    }

    const enhancedColumns = columns.map((col) => {
      if (typeof col.cell === "function") {
        const cellFn = col.cell

        return {
          ...col,
          cell: ({ row, ...props }: any) => {
            const originalCell = cellFn({ row, ...props })

            if (col.truncate !== false && (col.truncate || col.maxLength || globalMaxLength)) {
              const maxLength = col.maxLength || globalMaxLength
              const showTooltip = col.showTooltip !== false && (col.showTooltip || globalShowTooltip)
              const tooltipContent =
                col.tooltipContent && col.field
                  ? col.tooltipContent(row.getValue(col.field), row.original)
                  : undefined

              return (
                <TruncatedCell
                  content={originalCell}
                  maxLength={maxLength}
                  showTooltip={showTooltip}
                  tooltipContent={tooltipContent}
                />
              )
            }

            return originalCell
          },
        }
      }

      // If cell is a string or undefined, just return the column unchanged
      return col
    })


    cols.push(...enhancedColumns)

    if (showActionColumn && actionMenuItems.length > 0) {
      cols.push({
        id: "actions",
        enableSorting: false,
        width: 60,
        cell: ({ row }) => {
          const rowData = row.original
          return (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actionMenuItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.separator && index > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuItem onClick={() => item.onClick(rowData)}>{item.label}</DropdownMenuItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      })
    }

    return cols
  }, [columns, actionMenuItems, enableRowSelection, showActionColumn, globalMaxLength, globalShowTooltip])

  const table = useReactTable<T>({
    data,
    columns: finalColumns,
    onSortingChange: enableSorting ? handleSortingChange : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onRowSelectionChange: setRowSelection,
    manualPagination: !!onPaginationChange,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      rowSelection,
      pagination: {
        pageIndex: pageNumber - 1,
        pageSize,
      },
    },
    initialState: {
      pagination: {
        pageIndex: pageNumber - 1,
        pageSize,
      },
    },
  })

  // Handle row selection changes
  React.useEffect(() => {
    if (onRowSelectionChange && enableRowSelection) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original)
      onRowSelectionChange(selectedRows)
    }
  }, [rowSelection, onRowSelectionChange, enableRowSelection, table])

  React.useEffect(() => {
    if (orderField && orderType) {
      setSorting([{ id: orderField, desc: orderType === "desc" }])
    } else {
      setSorting([])
    }
  }, [orderField, orderType])

  React.useEffect(() => {
    if (onSortChange && sorting.length > 0) {
      const { id, desc } = sorting[0]
      onSortChange(id, desc ? "desc" : "asc")
    } else if (onSortChange) {
      onSortChange(orderField, orderType)
    }
  }, [sorting, onSortChange])

  const getStickyOffset = React.useCallback(
    (index: number, cols: EnhancedColumnDef<any>[], stickyStart: number, stickyEnd: number) => {
      if (index < stickyStart) {
        return {
          left:
            cols.slice(0, index).reduce((acc, col) => acc + (typeof col.width === "number" ? col.width : 150), 0) +
            "px",
        }
      }
      if (index >= cols.length - stickyEnd) {
        return {
          right:
            cols.slice(index + 1).reduce((acc, col) => acc + (typeof col.width === "number" ? col.width : 150), 0) +
            "px",
        }
      }
      return {}
    },
    [],
  )

  const getColumnWidth = (index: number) => {
    const { fixedWidths, flexColumns } = calculateColumnWidths
    if (fixedWidths[index]) {
      return fixedWidths[index]
    }
    return flexColumns > 0 ? `${100 / flexColumns}%` : "auto"
  }

  return (
    <div className={cn("w-full max-w-full", className)}>
      {/* Header with title and controls */}
      <div className="flex flex-col justify-start">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
            {enableFiltering && (
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Search..."
                  onChange={(event) => onFilterInputChange?.(event.target.value)}
                  className="max-w-sm focus-visible:border-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </div>
            )}
            <Button variant="outline" size="sm">
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden">
          {loading ? (
            <TableSkeleton
              columns={finalColumns.length}
              rows={5}
              header={
                <div className="flex bg-gray-50/90 border-b border-gray-200">
                  {finalColumns.map((_, idx) => (
                    <div key={idx} className="flex-1 border-r border-gray-100 last:border-r-0 p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              }
              bodyOnly={true}
            />
          ) : (
            <div
              className="relative overflow-y-auto"
              style={{
                height: tableHeight !== "auto" ? tableHeight : undefined,
                maxHeight: tableHeight === "auto" ? "70vh" : undefined,
              }}
            >
              <Table className="!relative border-collapse border-gray-200"  >
                <TableHeader className="bg-gray-50/90 sticky top-0 z-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-b border-gray-200 hover:bg-gray-50/50  ">
                      {headerGroup.headers.map((header, index) => {
                        const isStickyStart = index < stickyStart
                        const isStickyEnd = index >= headerGroup.headers.length - stickyEnd
                        const columnWidth = getColumnWidth(index)

                        return (
                          <TableHead key={index}
                            style={{
                              width: columnWidth,
                              minWidth: (header.column.columnDef as EnhancedColumnDef<T>).minWidth || 100,
                              maxWidth: (header.column.columnDef as EnhancedColumnDef<T>).maxWidth,
                              ...(isStickyStart || isStickyEnd
                                ? getStickyOffset(index, finalColumns, stickyStart, stickyEnd)
                                : {}),
                            }}
                            className={cn(
                              "!sticky top-0 bg-gray-50/95 backdrop-blur-xs border-r border-gray-100 last:border-r-0",
                              isStickyStart && "z-[70] left-0 shadow-[2px_0_4px_rgba(0,0,0,0.1)]",
                              isStickyEnd && "z-[70] right-0 shadow-[-2px_0_4px_rgba(0,0,0,0.1)]",
                              !isStickyStart && !isStickyEnd && "z-60"
                            )}
                          >

                            {isStickyStart && (
                              <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-card via-white/80 to-transparent shadow-[8px_0_12px_-2px_rgba(0,0,0,0.15)] pointer-events-none" />
                            )}
                            {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        {row.getVisibleCells().map((cell, index) => {
                          const isStickyStart = index < stickyStart
                          const isStickyEnd = index >= row.getVisibleCells().length - stickyEnd
                          const columnWidth = getColumnWidth(index)
                          const minWidth = (finalColumns[index] as EnhancedColumnDef<T>).minWidth
                          const maxWidth = (finalColumns[index] as EnhancedColumnDef<T>).maxWidth

                          return (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                "relative border-r border-gray-100 last:border-r-0",
                                isStickyStart && "sticky left-0 z-30 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.05)]",
                                isStickyEnd && "sticky right-0 z-30 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]",
                              )}
                              style={{
                                width: columnWidth,
                                minWidth: minWidth || 100,
                                maxWidth: maxWidth,
                                ...getStickyOffset(index, finalColumns, stickyStart, stickyEnd),
                              }}
                            >
                              {isStickyStart && (
                                <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-card via-white/80 to-transparent shadow-[8px_0_12px_-2px_rgba(0,0,0,0.15)] transition-opacity duration-300 ease-in-out pointer-events-none" />
                              )}
                              <div className="w-full h-full overflow-hidden">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={finalColumns.length} className="h-24 text-center text-gray-500">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {enablePagination && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-4 border-t border-gray-200 bg-white px-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">Rows per page:</p>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  const newPageSize = Number(value)
                  handlePaginationChange(1, newPageSize)
                }}
              >
                <SelectTrigger className="h-8 w-[70px] rounded border border-gray-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((pageSizeOption) => (
                    <SelectItem key={pageSizeOption.toString()} value={pageSizeOption.toString()}>
                      {pageSizeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {enableRowSelection && (
              <div className="text-sm text-gray-600">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                selected
              </div>
            )}

            <div className="flex items-center space-x-6">
              <div className="flex w-[120px] items-center justify-center text-sm font-medium text-gray-700">
                Page {pageNumber} of {Math.ceil(totalCount / pageSize) || 1}
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => handlePaginationChange(1, pageSize)}
                  disabled={pageNumber === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => handlePaginationChange(pageNumber - 1, pageSize)}
                  disabled={pageNumber === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => handlePaginationChange(pageNumber + 1, pageSize)}
                  disabled={pageNumber >= Math.ceil(totalCount / pageSize)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => handlePaginationChange(Math.ceil(totalCount / pageSize) || 1, pageSize)}
                  disabled={pageNumber >= Math.ceil(totalCount / pageSize)}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
