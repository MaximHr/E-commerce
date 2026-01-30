import { type Icon } from "@tabler/icons-react"
import { Link } from "react-router"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { UserT } from "@/types/user"

export function NavMain({
  items,
	user
}: {
  items: {
    title: string
    url: string
    icon?: Icon,
		accessedBy: string[]
  }[],
	user: UserT
}) {

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {user && items.filter(item => item.accessedBy.includes(user.role)).map((item) => (
						<Link 
							to={item.url} 
							key={item.title}
						>
							<SidebarMenuItem >
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
