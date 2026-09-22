import users from '../../test-data/users.json';
import { LandingPage } from '../../pages/LandingPage';
import { LoginPage } from '../../pages/LoginPage';

const userName = process.env.USER_NAME ?? 'demoUser';
const loginUser = users[userName as keyof typeof users];

export async function signInToClinic(landingPage: LandingPage, loginPage: LoginPage): Promise<void> {
  await landingPage.open();
  await landingPage.openClinic();
  await loginPage.open();
  await loginPage.signIn(loginUser.email, loginUser.password);
}