'use client'
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button , User, Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";
import Link from 'next/link';
import { useSession, signOut} from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar className="bg-gradient-to-r from-primary to-[#f46676] shadow-md">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-white">Blazer Pathways</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6 text-[#2b2d42]" justify="end">
          {!session || !session.user ? ( // If no session, show buttons
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
          ) : (// If session exists, show user
            <> 
            {session.user.role === "employer" && (
              <NavbarItem>
                <Link href="/employer/dashboard" ><p className="text-white">Employer Dashboard</p></Link>
              </NavbarItem>
            )}
            {session.user.role === "employer" && (
              <NavbarItem>
                <Link href="/submitJob" ><p className="text-white">Submit Job</p></Link>
              </NavbarItem>
            )}
            {session.user.role === "student" && (
              <NavbarItem>
                <Link href="/approvedJobs" ><p className="text-white">Job Board</p></Link>
              </NavbarItem>
            )}
            {session.user.role === "student" && (
              <NavbarItem>
                <Link href="/applications" ><p className="text-white">My Applications</p></Link>
              </NavbarItem>
            )}
            {session.user.role === "admin" && (
              <NavbarItem>
                <Link href="/adminPanel" ><p className="text-white">Admin Panel</p></Link>
              </NavbarItem>
            )}
            <NavbarItem>
              <Dropdown placement="bottom-start">
        <DropdownTrigger>
        <User   
      name={session.user.name}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }} className="text-white" 
    />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
          <p
      onClick={() => signOut({ callbackUrl: "/" })} // Redirect to the home page after sign-out
      className="text-text"
    >
      Sign Out
    </p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
            </NavbarItem></>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
