"use client";

import { Modal, Button, Field } from "@/components/atoms";
import { loginAction } from "@/utils/actions/user";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

const ModalLogin = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleClickLogInButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("Successfully logged in!");
      }
    });
  };

  return (
    <Modal
      open={true}
      classes={{
        wrapper: "max-w-lg !absolute",
        container: "flex flex-col gap-4",
      }}
      isDisabledPortal
    >
      <form action={handleClickLogInButton}>
        <Modal.Header>
          <h3 className="text-white text-2xl text-start font-bold">Login</h3>
          <p className="text-blue-gray text-sm font-medium mt-2">
            To continue, please enter your password.
          </p>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4 mt-4">
          <Field
            name="email"
            disabled={isPending}
            label={"Email"}
            full
            type="email"
          />
          <Field
            name="password"
            disabled={isPending}
            label={"Password"}
            full
            type="password"
          />
        </Modal.Body>
        <Modal.Footer className="flex flex-col gap-4 mt-4">
          <Button disabled={isPending} size="xl" full type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
          <Button
            disabled={isPending}
            size="xl"
            variant="plain"
            full
            href="/sign-up"
            as="link"
          >
            Sign up
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export { ModalLogin };
