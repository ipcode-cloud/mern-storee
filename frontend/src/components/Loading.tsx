import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const Loading = () => {
  return (
    <Card className="shadow-lg flex flex-col animate-pulse">
      <CardContent className="flex items-center justify-center flex-1 p-2">
        <div className="w-full h-[200px] bg-slate-400 rounded-md"></div>
      </CardContent>
      <CardFooter>
        <CardHeader className="flex flex-col w-full">
          <CardTitle className="text-lg font-bold text-slate-800"></CardTitle>

          <CardDescription>
            <div className="flex justify-between items-center gap-2">
              <p className="flex-1 text-lg p-2 bg-slate-400"></p>
              <Button variant="outline" className="p-4 bg-slate-400"></Button>
              <Button variant="outline" className="p-4 bg-slate-400"></Button>
            </div>
          </CardDescription>
          <CardDescription></CardDescription>
          <Button className="bg-slate-400"></Button>
        </CardHeader>
      </CardFooter>
    </Card>
  );
};
