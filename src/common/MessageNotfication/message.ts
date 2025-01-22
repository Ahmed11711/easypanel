// src/messages/loginMessages.ts
export const LOGIN_MESSAGES = {
  UNUSUAL_LOGIN_ATTEMPT_MAIL: (deviceName: string) =>
    `هناك محاولة تسجيل دخول غير معتادة إلى حسابك من جهاز ${deviceName}. إذا لم تكن أنت من يحاول الدخول، نوصي بشدة بتغيير كلمة المرور الخاصة بك لحماية حسابك. إذا كنت أنت، يمكنك متابعة العملية.`,

  UNUSUAL_LOGIN_ATTEMPT_NOTFICATION: (deviceName: string) =>
    `لاحظنا عمليه تسجيل من جهاز مختلف يرجي مراجعه الاجهزه المرتبطه`,
};

// for make any update for primary acount
// This modification is allowed for the primary account holder only
//Operation completed successfully
//Operation updated successfully
//Email address does not exist
