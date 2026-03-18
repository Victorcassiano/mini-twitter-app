"use client"
import { LoginForm } from "@/components/Login/LoginForm"
import { RegisterForm } from "@/components/Login/RegisterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStoreLoginTabs } from "@/lib/store/login-tabs"

export default function Login() {
  const { setTab, valueTab } = useStoreLoginTabs()

  return (
    <div className="w-96 mx-auto">
      <Tabs
        defaultValue={valueTab}
        value={valueTab}
        onValueChange={(value) => setTab(value)}
        className="w-100"
      >
        <TabsList variant="line" className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastrar</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
