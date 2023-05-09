import BasicPageHeading from "@/components/ui/Headings/BasicPageHeading";
import ChangeLogListCard from "@/components/ui/ChangeLog/ChangeLogListCard";

export default function Page() {
  return (
    <div className="space-y-10 ">
      <BasicPageHeading
        heading="Changelog"
        subheading="This is the changelog for the application. It will be updated as new features are added and bugs are fixed."
      />

      <div className="space-y-4 max-w-[768px]">
        <div className="space-y-4">
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
          <ChangeLogListCard
            date="22/4/2023"
            title="Title of Changelog Card"
            description="Description of the description in Markdown"
          />
        </div>
      </div>
    </div>
  );
}
