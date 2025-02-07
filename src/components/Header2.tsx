'use client'
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button , User, Dropdown,
  DropdownTrigger,
  DropdownMenu,
  NavbarMenuToggle,
  NavbarMenu, 
  NavbarMenuItem,
  DropdownItem
} from "@heroui/react";
import Link from 'next/link';
import { useSession, signOut} from "next-auth/react";
import Image from 'next/image';
import React from "react";

export default function Header() {
  const { data: session, status } = useSession(); // Include status
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Sign Out",
  ];


  return (
    <div>
      <Navbar className="w-[100vw] bg-gradient-to-r from-primary to-[#f46676] shadow-md overflow-x-hidden" onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
          <Link href="/">
            <div className="flex flex-row items-center">
            <Image src="/images/white blair.png" width={48} height={48} alt="logo"></Image>
            <p className="font-bold text-white">Blazer Pathways</p>
            </div>
            
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6 text-[#2b2d42]" justify="end">
          {status === "unauthenticated" ? ( // Check status directly
            <>
              <NavbarItem>
                <Button as={Link} href="/register" variant="flat" className="bg-[#fbfbfe] text-[#2b2d42]">
                  Register
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} href="/api/auth/signin" variant="flat" className="bg-[#ef233c] text-[#fbfbfe]">
                  Sign In
                </Button>
              </NavbarItem>
            </>
          ) : ( // User is authenticated
            <>
              {session?.user?.role === "employer" && ( // Optional chaining
                <>
                  <NavbarItem>
                    <Link href="/employer/dashboard" ><p className="text-white">Employer Dashboard</p></Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="/submitJob" ><p className="text-white">Submit Job</p></Link>
                  </NavbarItem>
                </>
              )}
              {session?.user?.role === "student" && ( // Optional chaining
                <>
                  <NavbarItem>
                    <Link href="/approvedJobs" ><p className="text-white">Job Board</p></Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="/applications" ><p className="text-white">My Applications</p></Link>
                  </NavbarItem>
                </>
              )}
              {session?.user?.role === "admin" && ( // Optional chaining
                <NavbarItem>
                  <Link href="/adminPanel" ><p className="text-white">Admin Panel</p></Link>
                </NavbarItem>
              )}
              <NavbarItem>
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <User   
                      name={session?.user?.name || "User"} // Provide a default name
                      avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                      }} 
                      className="text-white" 
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="signout" className="h-14 gap-2"> {/* Use a key prop */}
                      <p onClick={() => signOut({ callbackUrl: "/" })} className="text-text">
                        Sign Out
                      </p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      </Navbar>
    </div>
  );
}