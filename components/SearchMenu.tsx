"use client"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"

export default function SearchMenu(){
    return (
        <div className="flex">
        <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Availability</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    For Sale 
                  </MenubarItem>
                  <MenubarItem>
                    For Rent
                  </MenubarItem>
                  <MenubarItem>
                    Sold
                  </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Price</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            $0-$50,000 
                        </MenubarItem>
                        <MenubarItem>
                            $0-$100,000
                        </MenubarItem>
                        <MenubarItem>
                            $150,$200,000
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <Menubar>
            <MenubarMenu>
                <MenubarTrigger>More</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Beds
                        </MenubarItem>
                        <MenubarItem>
                            Bathrooms
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            
            </div>
    )
}
