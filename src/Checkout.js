export default function CheckoutScreen() {
    const {
      initPaymentSheet,
      presentPaymentSheet,
      confirmPaymentSheetPayment,
    } = useStripe();
    const [loading, setLoading] = useState(true);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
    const {
        paymentIntent,
        ephemeralKey,
        customer,
    } = await fetchPaymentSheetParams();
  
    const { error, paymentOption } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: 'Example Inc.',
        style: 'alwaysDark',
    });

    setLoading(false);
    if (!error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
    }
      updateButtons(paymentOption);
    };
  
    const updateButtons(paymentOption) => {
      if (paymentOption) {
        setPaymentMethod({
          label: paymentOption.label,
          image: paymentOption.image,
        });
      } else {
        setPaymentMethod(null);
      }
    }
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);

    const [paymentMethod, setPaymentMethod] = useState<{
        image: string;
        label: string;
      } | null>(null);
    
    const choosePaymentOption = async () => {
    const { error, paymentOption } = await presentPaymentSheet({
        confirmPayment: false,
    });

    if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
    }
    updateButtons(paymentOption);
    };

    const { confirmPaymentSheetPayment } = useStripe();

    const onPressBuy = async () => {
    const { error } = await confirmPaymentSheetPayment();
    
    if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
        Alert.alert(
        'Success',
        'Your order is confirmed!'
        );
    }
    };
  
    return (
      <Screen>
        <View>
          <Button
            variant="primary"
            loading={loading}
            title={
              paymentMethod ? (
                <View style={styles.row}>
                  <Image
                    source={{
                      uri: `data:image/png;base64,${paymentMethod.image}`,
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.text}>{paymentMethod.label}</Text>
                </View>
              ) : (
                'Choose payment method'
              )
            }
            disabled={!paymentSheetEnabled}
            onPress={choosePaymentOption}
          />
        </View>
  
        <View style={styles.section}>
          <Button
            variant="primary"
            loading={loading}
            disabled={!paymentMethod}
            title="Buy"
            onPress={onPressBuy}
          />
        </View>
      </Screen>
    );
  }