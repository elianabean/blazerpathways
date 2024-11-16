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
import Image from 'next/image';

export default function Footer() {

  return (
    <div>
      <Navbar className="border-t-1 border-[#AAAAAA] bg-white">
        <NavbarBrand>
          <Link href="/">
            <div className="flex flex-row items-center">
            <Image src="/images/blair.png" width={48} height={48} alt="logo"></Image>
            <p className="font-bold text-text">Blazer Pathways</p>
            </div>
            
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6 text-[#2b2d42]" justify="end">
          <p className="text-[10px] text-[#AAAAAA]">All picture credits to flaticon.co</p>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
