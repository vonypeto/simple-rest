import AccountModel from '../../src/models/account';

export const deleteUserByEmail = async (email) => {
  try {
    // Check if the user exists in the database
    const user = await AccountModel.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }

    // Delete the user
    await AccountModel.findByIdAndDelete(user._id);

    return { message: 'User deleted successfully' };
  } catch (error) {
    throw error;
  }
};
