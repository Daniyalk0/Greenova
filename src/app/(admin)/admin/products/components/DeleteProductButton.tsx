"use client";

import { useRouter } from "next/navigation";
import ConfirmDelete from "./ConfirmDelete";
import { deleteProduct } from "../actions";
import { Trash2 } from "lucide-react";
// import ConfirmDelete from "@/components/ConfirmDelete";
// import { deleteProduct } from "@/actions/delete-product";

type Props = {
  productId: number;
  redirectTo?: string;
};

export default function DeleteProductButton({
  productId,
  redirectTo,
}: Props) {
  const router = useRouter();

  return (
    <ConfirmDelete
      title="Delete product"
      description="This product will be permanently deleted."
      onConfirm={async () => {
        await deleteProduct(productId);

        if (redirectTo) {
          router.push(redirectTo);
        }
      }}
    >
      <button
        type="button"
        className="text-red-600  text-sm"
      >
        <Trash2 className="w-5 h-5" />
      </button>

    </ConfirmDelete>
  );
}
