import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Button, Divider} from "@nextui-org/react";
import Link from 'next/link'

export default function Header() {
  return (
    <div>
        <Navbar className="bg-white shadow-md" isBordered>
      <NavbarBrand>
        <Link href="/"><p className="font-bold">Blazer Pathways</p></Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 text-[#2b2d42]" justify="end">
        <NavbarItem>
          <Link href="/submitJob">
            Submit Posting
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="/approvedJobs" aria-current="page">
            Job Board
          </Link>
        </NavbarItem>
        <Divider orientation="vertical" className="h-[50%] bg-[#eaeaea]"/>
        <NavbarItem className="hidden lg:flex">
            <Button as={Link} href="/register" variant="flat" className="bg-[#fbfbfe] text-[#2b2d42]">
                Register
            </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/api/auth/signin" variant="flat" className="bg-[#ef233c] text-[#fbfbfe]">
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </div>
  );
}
