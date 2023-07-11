import { Admin } from '../app/modules/admin/admin.model';
// import { User } from '../app/modules/user/user.model';

// const isUserExist = async (payload: string) => {
//   // console.log(payload);
//   // const result = await User.findOne({ payload });
//   // if (result !== null) {
//   //   console.log(result, 'test');
//   //   return result;
//   // } else {
//   console.log('test2');
//   const result = await Admin.findOne({ payload });
//   console.log(result, 'test3');
//   return result;
//   // }
// };
const isUserExist = async (payload: string) => {
  const result = await Admin.findOne({ payload });
  console.log(result, 'test3');
  return result;
};

export const UserExistService = {
  isUserExist,
};
