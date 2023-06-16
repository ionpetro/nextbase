import { ClientAdminFeedbackListPage } from './ClientAdminFeedbackListPage';
// Server action must be imported from the server file
// and passed as a prop to the client component
import { getAllInternalFeedback } from './actions';
import { adminGetUser } from '../actions';

export default function FeedbackList() {
  return (
    <ClientAdminFeedbackListPage
      getAllInternalFeedback={getAllInternalFeedback}
      adminGetUser={adminGetUser}
    />
  );
}
