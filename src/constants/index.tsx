import type { SVGProps, ReactElement } from "react";
import {
  IconEducation,
  IconEmail,
  IconFinance,
  IconGaming,
  IconShopping,
  IconSocial,
  IconSoftware,
  IconTechnology,
  IconTelecom,
  IconUtilities,
  IconWork,
  IconOther,
  IconArchive,
} from "./icons";

export type CategoryIconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;
export type CategoryMeta = { label: string; icon: CategoryIconComponent };

export const CATEGORY_META: Record<string, CategoryMeta> = {
  education:  { label: "Education",  icon: IconEducation  },
  email:      { label: "Email",      icon: IconEmail      },
  finance:    { label: "Finance",    icon: IconFinance    },
  gaming:     { label: "Gaming",     icon: IconGaming     },
  shopping:   { label: "Shopping",   icon: IconShopping   },
  social:     { label: "Social",     icon: IconSocial     },
  software:   { label: "Software",   icon: IconSoftware   },
  technology: { label: "Technology", icon: IconTechnology },
  telecom:    { label: "Telecom",    icon: IconTelecom    },
  utilities:  { label: "Utilities",  icon: IconUtilities  },
  work:       { label: "Work",       icon: IconWork       },
  other:      { label: "Other",      icon: IconOther      },
  archive:    { label: "Archive",    icon: IconArchive    },
};