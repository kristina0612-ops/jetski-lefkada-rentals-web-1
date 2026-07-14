import { d as defineMiddleware, ae as sequence } from './chunks/params-and-props_C6QB6PI8.mjs';
import 'piccolore';
import 'clsx';
import { s as supabase } from './chunks/supabase_z0w-xlsH.mjs';

const onRequest$1 = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  const pathname = url.pathname;
  if (!pathname.startsWith("/admin")) {
    return next();
  }
  if (pathname === "/admin/login") {
    return next();
  }
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return redirect("/admin/login");
  }
  if (!supabase) {
    cookies.delete("sb-access-token", { path: "/" });
    return redirect("/admin/login");
  }
  try {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data?.user) {
      cookies.delete("sb-access-token", { path: "/" });
      return redirect("/admin/login");
    }
  } catch {
    cookies.delete("sb-access-token", { path: "/" });
    return redirect("/admin/login");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
