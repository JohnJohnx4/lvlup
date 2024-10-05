import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

export interface CourseProps {
  id: string;
  title: string;
  image: string;
  badge: string;
  description: string;
  buttonText: string;
  href: string;
  dueDate: Date;
  assignedDate: Date;
}

interface CourseCardProps {
  course: CourseProps;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const {
    id,
    title,
    image,
    badge,
    description,
    buttonText,
    dueDate,
    assignedDate,
  } = course;

  return (
    <Card
      style={{
        maxWidth: 300,
      }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      key={id}
    >
      <Card.Section>
        <Image src={image} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="green">{badge}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Assigned: {assignedDate.toLocaleDateString()}
      </Text>

      <Text size="sm" c="dimmed">
        Due:{" "}
        {(new Date(dueDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24) <
        14
          ? `${Math.ceil(
              (new Date(dueDate).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )} days left`
          : dueDate.toLocaleDateString()}
      </Text>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        {buttonText}
      </Button>
    </Card>
  );
};
