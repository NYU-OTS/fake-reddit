import * as React from "react";
import { PasswordChangeForm } from "../../containers/PasswordChange/PasswordChange";
import { PasswordForgetForm } from "../../containers/PasswordForget/PasswordForgetForm";

export const Account = (authUser: { email: string } | null) => (
    <div>
        <h1>Account: {!!authUser && authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </div>
)