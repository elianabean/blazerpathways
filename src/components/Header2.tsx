import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Button, Divider, User} from "@nextui-org/react";
import Link from 'next/link'

export default function Header() {
  return (
    <div>
        <Navbar className="bg-gradient-to-r from-primary to-[#f46676] shadow-md">
      <NavbarBrand>
        <Link href="/"><p className="font-bold text-white">Blazer Pathways</p></Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 text-[#2b2d42]" justify="end">
        <NavbarItem>
            <User   
      name="Jane Doe"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }} className="text-white" 
    />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </div>
  );
}
