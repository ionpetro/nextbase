import { GiveFeedbackDialog } from "@/components/presentational/tailwind/GiveFeedbackDialog";
import { T } from "@/components/ui/Typography";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { getAllInternalFeedbackForUser } from "@/utils/supabase/internalFeedback";
import { getLoggedInUser } from "@/app/(authenticated-pages)/getLoggedInUser";
import TableHeader from "@/components/ui/Table/TableHeader";
import TableCell from "@/components/ui/Table/TableCell";
import { Anchor } from "@/components/Anchor";
import { formatFieldValue, mapStatusToVariant } from "@/utils/feedback";
import moment from "moment";
import { Badge } from "@/components/ui/Badge";

export default async function MyFeedback() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await getLoggedInUser(supabaseClient);
  const feedbackList = await getAllInternalFeedbackForUser(supabaseClient, user.id);
  return <div className="space-y-4">
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <T.H1>My Feedback</T.H1>
        <GiveFeedbackDialog isExpanded={true} />
      </div>
      <T.Subtle>
        A list of all your feedback to the Nextbase team.
      </T.Subtle>
    </div>
    {/* Feedback list table */}
    <div className="flex rounded-lg bg-clip-border border border-gray-200 max-w-[1296px] overflow-hidden">
      <table className="w-full bg-clip-content border-slate-200">
        <thead className="w-full bg-clip-border">
          <tr className="p-0 ">
            <th className="p-0 ">
              <TableHeader>#</TableHeader>
            </th>
            <th className="p-0 ">
              <TableHeader>Feedback</TableHeader>
            </th>
            <th className="p-0 ">
              <TableHeader>Type</TableHeader>
            </th>
            <th className="p-0 ">
              <TableHeader>Priority</TableHeader>
            </th>
            <th className="p-0 ">
              <TableHeader>Created At</TableHeader>
            </th>
            <th className="p-0 ">
              <TableHeader>Status</TableHeader>
            </th>
          </tr>
        </thead>
        <tbody>
          {feedbackList
            ? feedbackList.map((feedback, index) => (
              <tr className="p-0" key={feedback.id}>
                <td className="p-0 ">
                  <TableCell className="px-6 py-4 truncate">
                    {index + 1}
                  </TableCell>
                </td>
                <td className="p-0 ">
                  <Anchor
                    className=" "
                    key={feedback.id}
                    href={`/feedback/${feedback.id}`}
                  >
                    <TableCell className="text-blue-500 px-6 py-4 truncate font-[500] hover:underline">
                      {feedback.title}
                    </TableCell>
                  </Anchor>
                </td>

                <td className="p-0 ">
                  <TableCell className="px-6 py-4 truncate">
                    {formatFieldValue(feedback.type)}
                  </TableCell>
                </td>
                <td className="p-0">
                  <TableCell className="px-6 py-4 truncate">
                    {formatFieldValue(feedback.priority)}
                  </TableCell>
                </td>
                <td className="p-0">
                  <TableCell className="px-6 py-4 truncate">
                    {moment(feedback.created_at).format('LL')}
                  </TableCell>
                </td>
                <td className="p-0">
                  <TableCell className="flex items-center h-[58px] justify-center">
                    <Badge
                      className=" whitespace-nowrap "
                      variant={mapStatusToVariant(feedback.status)}
                    >
                      {formatFieldValue(feedback.status)}
                    </Badge>
                  </TableCell>
                </td>
              </tr>
            ))
            : null}
        </tbody>
      </table>
    </div>
  </div>
}
