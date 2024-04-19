import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const propertyId = req.query.id as string;
    const updatedProperty = req.body;

    try {
      const property = await prisma.property.update({
        where: { id: parseInt(propertyId) },
        data: {
          listPrice: updatedProperty.listPrice,
          state: updatedProperty.state,
          city: updatedProperty.city,
          address: updatedProperty.address,
          squareFootage: updatedProperty.squareFootage,
          numberOfRooms: updatedProperty.numberOfRooms,
          numberOfBathrooms: updatedProperty.numberOfBathrooms,
          propertyType: updatedProperty.propertyType,
          // Update other fields as needed
        },
      });

      res.status(200).json(property);
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ error: 'An error occurred while updating the property' });
    }
  } else if (req.method === 'DELETE') {
    const propertyId = req.query.id as string;

    try {
      await prisma.property.delete({
        where: { id: parseInt(propertyId) },
      });

      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'An error occurred while deleting the property' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}