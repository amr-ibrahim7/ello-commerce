import React from 'react';
import Link from 'next/link';

interface RenderFooterSectionProps {
  title: string;
  links: string[];
  type: string;
  hoveredSection: string | null;
  hoveredIndex: number | null;
  handleMouseEnter: (section: string, index: number) => void;
  handleMouseLeave: () => void;
}

const RenderFooterSection: React.FC<RenderFooterSectionProps> = ({
  title,
  links,
  type,
  hoveredSection,
  hoveredIndex,
  handleMouseEnter,
  handleMouseLeave
}) => {
  const getLinkClasses = (currentSection: string, currentIndex: number) => {
    if (!hoveredSection) {
      return "text-primary hover:text-secondary-foreground";
    }
    
    if (hoveredSection !== currentSection) {
      return "text-primary hover:text-secondary-foreground";
    }
    
    if (hoveredSection === currentSection) {
      return hoveredIndex === currentIndex 
        ? "text-secondary-foreground" 
        : "opacity-30";
    }
    
    return "hover:text-secondary-foreground";
  };

  return (
    <div>
      <h3 className="font-medium mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={link}>
            <Link
              href="#"
              className={`text-sm transition-all duration-300 ${getLinkClasses(type, index)}`}
              onMouseEnter={() => handleMouseEnter(type, index)}
              onMouseLeave={handleMouseLeave}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderFooterSection;