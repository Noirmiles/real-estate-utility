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
import { useState } from 'react'; // Import useState hook
import React from 'react'; // Import useState hook

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu"; // Assuming this is the path to your Shadcn UI components
import { Slider } from "@/components/ui/slider"

export default function SearchMenu() {

    return (
        <div className="flex">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Availability</MenubarTrigger>
                    <MenubarContent>
                        <RadioGroup defaultValue="option-one">
                            <MenubarItem>

                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value="option-one " id="option-one" />
                                    <Label htmlFor="option-one">For Sale</Label>
                                </div>
                            </MenubarItem>
                            <MenubarItem>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value="option-two" id="option-two" />
                                    <Label htmlFor="option-two">For Rent</Label>
                                </div>
                            </MenubarItem>
                            <MenubarItem>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value="option-three" id="option-three" />
                                    <Label htmlFor="option-three">Sold</Label>
                                </div>
                            </MenubarItem>
                        </RadioGroup>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Price</MenubarTrigger>
                    <MenubarContent>
                        <RadioGroup defaultValue="option-one">
                            <MenubarItem>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value="option-one " id="option-one" />
                                    <Label htmlFor="option-one">$0 - $50,000</Label>
                                </div>
                            </MenubarItem>

                            <MenubarItem>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value="option-two" id="option-two" />
                                    <Label htmlFor="option-two">$50,000 - $200,000</Label>
                                </div>
                            </MenubarItem>

                            <MenubarItem>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value="option-three" id="option-three" />
                                    <Label htmlFor="option-three">$200,000 - $400,000</Label>
                                </div>
                            </MenubarItem>

                            <MenubarItem>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value="option-three" id="option-three" />
                                    <Label htmlFor="option-three">$400,000+</Label>
                                </div>
                            </MenubarItem>
                        </RadioGroup>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>


            <Menubar>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        More Filters
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <ScrollArea className="h-[200px] w-[250px] ">

                            <DropdownMenuLabel className="py-2">
                                <span className="mr-2 ">Sq. Ft: x</span>
                                <Slider className="pt-2" defaultValue={[2]} max={100} step={10} />
                            </DropdownMenuLabel>

                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Beds
                                    <RadioGroup defaultValue="option-one">
                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-one " id="option-one" />
                                                <Label htmlFor="option-one">Any</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-two" id="option-two" />
                                                <Label htmlFor="option-two">1+</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-three" id="option-three" />
                                                <Label htmlFor="option-three">2+</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-three" id="option-three" />
                                                <Label htmlFor="option-three">3+</Label>
                                            </div>
                                        </DropdownMenuItem>
                                    </RadioGroup>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>

                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Bathrooms
                                    <RadioGroup defaultValue="option-one">
                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-one " id="option-one" />
                                                <Label htmlFor="option-one">Any</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-two" id="option-two" />
                                                <Label htmlFor="option-two">1+</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-three" id="option-three" />
                                                <Label htmlFor="option-three">1.5+</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-three" id="option-three" />
                                                <Label htmlFor="option-three">2+</Label>
                                            </div>
                                        </DropdownMenuItem>
                                    </RadioGroup>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>

                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Price
                                    <RadioGroup defaultValue="option-one">
                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-one " id="option-one" />
                                                <Label htmlFor="option-one">$0 - $50,000</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-two" id="option-two" />
                                                <Label htmlFor="option-two">$50,000 - $200,000</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-three" id="option-three" />
                                                <Label htmlFor="option-three">$200,000 - $400,000</Label>
                                            </div>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="option-three" id="option-three" />
                                                <Label htmlFor="option-three">$400,000+</Label>
                                            </div>
                                        </DropdownMenuItem>
                                    </RadioGroup>
                                </DropdownMenuLabel>

                            </DropdownMenuGroup>
                        </ScrollArea>

                    </DropdownMenuContent>

                </DropdownMenu>
            </Menubar>





        </div>
    )
}
