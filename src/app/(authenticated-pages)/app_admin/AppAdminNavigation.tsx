'use client'
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { FileLineChart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FiBriefcase, FiSettings, FiUsers } from 'react-icons/fi';
import { match } from 'path-to-regexp';
import { MdOutlineFeedback } from 'react-icons/md';
import { RxActivityLog } from 'react-icons/rx';
import { RiRoadMapLine } from 'react-icons/ri';

const matchFeedbackItemPath = match('/app_admin/feedback-list/:feedbackItem/(.*)?');

const tabs = [
    {
        label: 'Admin Dashboard',
        href: `/app_admin`,
        icon: <FileLineChart />,
    },
    {
        label: 'Users',
        href: `/app_admin/users`,
        icon: <FiUsers />,
    },
    {
        label: 'Organizations',
        href: `/app_admin/organizations`,
        icon: <FiBriefcase />,
    },
    {
        label: 'Application Settings',
        href: `/app_admin/settings`,
        icon: <FiSettings />,
    },
    {
        label: 'Feedback List',
        href: `/app_admin/feedback-list`,
        icon: <MdOutlineFeedback />,
    },

    {
        label: 'Changelog List',
        href: `/app_admin/changelog-list`,
        icon: <RxActivityLog />,
    },
    {
        label: 'Roadmap',
        href: `/app_admin/internal-roadmap`,
        icon: <RiRoadMapLine />,
    },
];


export function AppAdminNavigation() {
    const pathname = usePathname();
    const isFeedbackItemPath = pathname ? matchFeedbackItemPath(pathname) : false;
    if (isFeedbackItemPath) {
        return null;
    }
    return <>
        <div className="space-y-2">
            <BasicPageHeading
                heading="Admin Panel"
                subheading=" You are currently in the Application Admin Dashboard area. All
      sections of this area are protected and only application admins
      can access this."/>
        </div>
        <div className="space-y-6">
            <TabsNavigation tabs={tabs} />
        </div>
    </>;
}
