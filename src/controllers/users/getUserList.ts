//  src/controllers/users/getUserList.ts
import { Request, Response } from 'express';
import { getUsersPaginated } from '@services/userService';
import { errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const getUserListController = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = (req as any).user?.id;

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const search = req.query.search ? String(req.query.search) : undefined;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : undefined;

    const { data, pagination } = await getUsersPaginated({
      page,
      limit,
      search,
      sortBy,
      excludeUserId: loggedInUserId,
    });

    // Normalize fields
    const normalizedData = data.map((user) => ({
      ...user,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      age: user.age ?? 0,
      updatedAt: user.updatedAt || '',
    }));

    return res.json({
      success: true,
      message: 'Users fetched successfully',
      statusCode: StatusCode.OK,
      data: normalizedData,
      pagination,
    });
  } catch (err: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
      errorResponse({
        message: err.message || 'Internal server error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: null,
      })
    );
  }
};
