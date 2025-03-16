
import React from 'react';
import PageHeading from '@/components/PageHeading';
import { useWedding } from '@/contexts/WeddingContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const AdminGuestList = () => {
  const { guestResponses } = useWedding();
  
  return (
    <div>
      <PageHeading title="Guest List" subtitle="Manage your wedding guest responses" center={false} />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Dietary Restrictions</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guestResponses.length ? (
              guestResponses.map((response) => (
                <TableRow key={response.id}>
                  <TableCell className="font-medium">{response.name}</TableCell>
                  <TableCell>{response.email}</TableCell>
                  <TableCell>
                    <Badge variant={response.attending ? "default" : "outline"}>
                      {response.attending ? "Attending" : "Not Attending"}
                    </Badge>
                  </TableCell>
                  <TableCell>{response.numberOfGuests}</TableCell>
                  <TableCell>{response.dietaryRestrictions || 'None'}</TableCell>
                  <TableCell className="max-w-xs truncate">{response.message || 'No message'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No responses yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminGuestList;
