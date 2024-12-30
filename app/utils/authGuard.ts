import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export const withAuthGuard = async (context: any) => {
    const session = await getServerSession(context.req, context.res , authOptions);
    if (!session) {
        return {
          redirect: {
            destination: "/auth/signin",
            permanent: false,
          },
        };
      }
      return { props: { session } };
}