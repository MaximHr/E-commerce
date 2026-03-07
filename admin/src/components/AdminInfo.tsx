import { Card, CardTitle } from '@/components/ui/card';

const AdminInfo = () => {
  return (
    <div className="hidden lg:flex gradient-background justify-center items-center">
      <Card className="fixed-card max-w-104 px-9 py-7 bg-white/25">
        <CardTitle className="text-xl">
          Hello! Thank you for visiting my app. You can access all features of
          the admin panel by using this email:
          <span className="font-bold"> admin@gmail.com</span>, and{" "}
          <span className="font-bold">admin123</span> as a password.
          <br /> Feel free to test anything.
        </CardTitle>
        <div className="flex items-center gap-3">
          <img
            className="rounded-full w-16 h-16 object-cover px-0"
            loading="lazy"
            src="placeholder.svg"
            alt="Me"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-medium special-font">Maksim Hristov</h2>
            <p className="font-medium text-sm opacity-90 text-muted">
              Developer
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminInfo;
