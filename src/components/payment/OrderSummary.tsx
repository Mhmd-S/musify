import { CreditCard, Package } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { Separator } from "@components/ui/separator"

interface OrderSummaryProps {
  packageName: string
  credits: number
  price: number
  taxRate?: number
  processingFee: number
}

export default function OrderSummaryCard({
  packageName,
  credits,
  price,
  taxRate,
  processingFee
}: OrderSummaryProps) {
  // const taxAmount = price * taxRate
  const total = price + processingFee

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{packageName} Package</span>
          </div>
          <span className="font-medium">${price.toFixed(2)}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {credits.toLocaleString()} AI Credits
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${price.toFixed(2)}</span>
          </div>
          {/* <div className="flex justify-between text-sm">
            <span>Tax ({(taxRate * 100).toFixed(2)}%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div> */}
          <div className="flex justify-between text-sm">
            <span>Processing Fee</span>
            <span>${processingFee.toFixed(2)}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4" />
          <span>Secure payment processed by Square</span>
        </div>
        <div>
          Your card will be charged ${total.toFixed(2)} upon submission.
        </div>
      </CardFooter>
    </Card>
  )
}