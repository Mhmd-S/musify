import { CheckCircle, Download, Mail, ArrowRight } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { Separator } from "@components/ui/separator"

interface PaymentSuccessProps {
  orderNumber: string
  packageName: string
  credits: number
  amount: number
  email: string
}

export default function PaymentSuccessPage({
  orderNumber,
  packageName,
  credits,
  amount,
  email
}: PaymentSuccessProps) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary-foreground rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Payment Successful!</CardTitle>
          <CardDescription className="text-xl">
            Thank you for your purchase. Your order has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">Order Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
              <span className="text-muted-foreground">Package:</span>
              <span className="font-medium">{packageName}</span>
              <span className="text-muted-foreground">AI Credits:</span>
              <span className="font-medium">{credits.toLocaleString()}</span>
              <span className="text-muted-foreground">Amount Paid:</span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Next Steps</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Your AI credits have been added to your account.</li>
              <li>You can start using your credits immediately in your projects.</li>
              <li>A receipt has been sent to {email}.</li>
            </ul>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Download Receipt
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Mail className="mr-2 h-4 w-4" /> Email Support
          </Button>
          <Button className="w-full sm:w-auto">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}