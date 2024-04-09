export function FeedbackList() {
    return null;
}

export function FeedbackListFallback() {
    return null
}


// const FeedbackListFallback: React.FC = () => {
//     return (
//         <div className="flex rounded-lg bg-clip-border border max-w-[1296px] overflow-hidden">
//             <ShadcnTable>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Feedback</TableHead>
//                         <TableHead>Type</TableHead>
//                         <TableHead>Priority</TableHead>
//                         <TableHead>Created At</TableHead>
//                         <TableHead>Status</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {Array.from({ length: 10 }).map((_, index) => (
//                         <TableRow key={index}>
//                             <TableCell>
//                                 <Fallback />
//                             </TableCell>
//                             <TableCell>
//                                 <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
//                             </TableCell>
//                             <TableCell>
//                                 <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
//                             </TableCell>
//                             <TableCell>
//                                 <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
//                             </TableCell>
//                             <TableCell>
//                                 <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
//                             </TableCell>
//                             <TableCell>
//                                 <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </ShadcnTable>
//         </div>
//     );
// };