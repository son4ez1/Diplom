"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BellIcon as BrandTelegram,
  User,
  Users,
  BookOpen,
  LogOut,
} from "lucide-react";
import { Student } from "@/components/entity/types/student.interface";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StudentCardProps {
  student: Student;
}

export default function StudentProfile({ student }: StudentCardProps) {
  const fullName = `${student.last_name || ""} ${student.first_name || ""} ${
    student.patronymic || ""
  }`.trim();
  const curatorName = `${student.group?.curator?.last_name || ""} ${
    student.group?.curator?.first_name || ""
  } ${student.group?.curator?.patronymic || ""}`.trim();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push(`/login`);
  };

  return (
    <Card className="w-full max-w-md rounded-md overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-2xl font-bold">
          Привет, {student.first_name || "студент"}!
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2 className="text-lg font-semibold">
                {fullName || "Имя не указано"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {student.login || "Логин не указан"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Badge
              variant="outline"
              className="w-full justify-start text-base font-normal"
            >
              <Users className="mr-2 h-4 w-4" />
              Группа: {student.group?.name || "Не указана"}
            </Badge>

            <Badge
              variant="outline"
              className="w-full justify-start text-base font-normal"
            >
              <User className="mr-2 h-4 w-4" />
              Преподаватель: {curatorName || "Не указан"}
            </Badge>

            <Badge
              variant="outline"
              className="w-full justify-start text-base font-normal"
            >
              <BrandTelegram className="mr-2 h-4 w-4" />
              Telegram:{" "}
              {student.telegram?.username
                ? `@${student.telegram.username}`
                : "Не указан"}
              {student.telegram?.first_name
                ? ` (${student.telegram.first_name})`
                : ""}
            </Badge>
            <Button
              onClick={() => handleLogout()}
              size={"sm"}
              className="w-full"
            >
              <LogOut />
              Выйти
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
