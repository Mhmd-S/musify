import { Zap, Sparkles, Rocket, Check } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"

interface CreditPackageProps {
  name: string
  credits: number
  price: number
  perCreditPrice: number
  features: string[]
  icon: React.ReactNode
  isBestValue?: boolean
  onSelect: (packageName: string, credits: number, price: number) => void
}

export default function CreditPackages() {
  const handleSelectPackage = (packageName: string, credits: number, price: number) => {
    console.log(`Selected package: ${packageName}, Credits: ${credits}, Price: $${price}`)
    // Here you would typically update the cart or trigger some other action
  }

  const CreditPackage: React.FC<CreditPackageProps> = ({ 
    name, 
    credits, 
    price, 
    perCreditPrice, 
    features, 
    icon, 
    isBestValue, 
    onSelect 
  }) => (
    <Card className={`w-full max-w-sm transition-all duration-300 hover:shadow-lg ${isBestValue ? 'border-primary border-2' : ''}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className={`p-3 rounded-full ${isBestValue ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
            {icon}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="text-lg font-semibold text-primary">
          {credits.toLocaleString()} AI Credits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-sm text-muted-foreground ml-2">
            (${perCreditPrice.toFixed(4)}/credit)
          </span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full text-lg py-6" 
          variant={isBestValue ? "default" : "outline"}
          onClick={() => onSelect(name, credits, price)}
        >
          <Zap className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
      {isBestValue && (
        <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            Best Value
          </Badge>
        </div>
      )}
    </Card>
  )

  return (
    <div className="space-y-10 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold">Choose Your AI Credit Package</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Power up your AI projects with our flexible credit packages. More credits mean more possibilities!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <CreditPackage
          name="Starter"
          credits={1000}
          price={10}
          perCreditPrice={0.01}
          features={[
            "Ideal for small projects",
            "Credits valid for 3 months",
            "Basic email support"
          ]}
          icon={<Zap className="w-8 h-8" />}
          onSelect={handleSelectPackage}
        />
        <CreditPackage
          name="Pro"
          credits={5000}
          price={45}
          perCreditPrice={0.009}
          features={[
            "Perfect for medium-sized teams",
            "Credits valid for 6 months",
            "Priority email support",
            "Access to beta features"
          ]}
          icon={<Sparkles className="w-8 h-8" />}
          isBestValue={true}
          onSelect={handleSelectPackage}
        />
        <CreditPackage
          name="Enterprise"
          credits={10000}
          price={80}
          perCreditPrice={0.008}
          features={[
            "Ideal for large-scale projects",
            "Credits valid for 12 months",
            "24/7 phone & email support",
            "Custom AI model fine-tuning",
            "Dedicated account manager"
          ]}
          icon={<Rocket className="w-8 h-8" />}
          onSelect={handleSelectPackage}
        />
      </div>
    </div>
  )
}