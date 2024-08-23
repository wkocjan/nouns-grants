"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Category } from "@/lib/data/categories"
import Image from "next/image"
import Link from "next/link"

type Props = {
  categories: Category[]
}

export function CategoriesList(props: Props) {
  return (
    <Card>
      <CardContent className="max-sm:mt-1.5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Name</TableHead>
              <TableHead className="text-center"># Grants</TableHead>
              <TableHead className="text-center">Budget</TableHead>
              <TableHead className="text-center">Total Votes</TableHead>
              <TableHead className="text-center">Your Vote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.categories.map((category) => (
              <TableRow key={category.title}>
                <TableCell className="min-w-[64px] md:w-[92px]">
                  <Image
                    src={category.imageUrl}
                    alt={category.title}
                    width={80}
                    height={80}
                    className="aspect-square size-12 rounded-md object-cover md:size-16"
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/category/${category.id}`}
                    className="font-medium duration-100 ease-out hover:text-primary md:text-lg"
                  >
                    {category.title}
                  </Link>
                  <p className="text-xs text-muted-foreground max-sm:hidden md:text-sm">
                    {category.tagline}
                  </p>
                </TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">
                  <Badge>${category.budget.toLocaleString("en-EN")}/mo</Badge>
                </TableCell>
                <TableCell className="text-center">{category.votes}</TableCell>
                <TableCell className="text-center">
                  {category.votes / 2}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
