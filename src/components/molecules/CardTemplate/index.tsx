import { Card } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { FC, PropsWithChildren, ReactNode } from "react";

interface CardTemplateComponentProps extends PropsWithChildren {
  title?: ReactNode;
  description?: string;
  descriptionBtn?: any;
  classes?: {
    card?: string;
    cardHeader?: string;
    cardTitle?: string;
    cardDescription?: string;
  };
}

const CardTemplateComponent: FC<CardTemplateComponentProps> = ({
  title,
  description,
  descriptionBtn,
  children,
  classes,
}) => {
  return (
    <Card
      className={cn(
        "border border-navy-15 bg-navy-25 rounded-xl w-full max-w-[400px]",
        classes?.card
      )}
    >
      {(title || description) && (
        <Card.Header className={cn(classes?.cardHeader, "mb-4")}>
          {title && typeof title === "string" ? (
            <Card.Title
              className={cn(
                "text-black text-2xl font-bold ",
                classes?.cardTitle
              )}
            >
              {title}
            </Card.Title>
          ) : (
            title
          )}
          {description && (
            <Card.Description
              className={cn(
                "text-[#666666] text-sm font-medium leading-tight",
                classes?.cardDescription
              )}
            >
              {description}
              <>
                {descriptionBtn && descriptionBtn}
              </>
            </Card.Description>
          )}
        </Card.Header>
      )}
      {children}
    </Card>
  );
};

export const CardTemplate = Object.assign(CardTemplateComponent, Card);
