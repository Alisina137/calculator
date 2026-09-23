import type { AppLanguage } from "@/i18n/languages";

export type ToolGuideId = "percentage" | "discount" | "unit" | "age" | "date";

export type ToolGuide = {
  purpose: string;
  inputs: string[];
  result: string;
};

export type ToolGuideLabels = {
  title: string;
  inputs: string;
  result: string;
  toggleTitle: string;
  visible: string;
  hidden: string;
  accessibility: string;
};

const makeGuides = (
  percentage: ToolGuide,
  discount: ToolGuide,
  unit: ToolGuide,
  age: ToolGuide,
  date: ToolGuide
): Record<ToolGuideId, ToolGuide> => ({ percentage, discount, unit, age, date });

const guides: Record<AppLanguage, Record<ToolGuideId, ToolGuide>> = {
  en: makeGuides(
    { purpose:"Calculate a percent of a number, compare two values, or measure percentage increase and decrease.", inputs:["Choose the calculation type.","Enter the first value.","Enter the base, total, or new value in the second field."], result:"You get the percentage result and, when relevant, the increase or decrease amount." },
    { purpose:"Calculate the price after a discount and how much you save.", inputs:["Enter the original price.","Enter a discount from 0 to 100.","Enter the quantity, or keep it at 1 for one item."], result:"You get the discount amount, final price, total, and total savings." },
    { purpose:"Convert a value from one unit to another.", inputs:["Choose a unit category.","Enter the amount to convert.","Choose the source unit and destination unit."], result:"The converted value appears in the destination unit." },
    { purpose:"Calculate exact age using the Jalali or Gregorian calendar.", inputs:["Choose the calendar.","Enter or pick the birth date.","Enter or pick the calculation date."], result:"You get the exact age, total days lived, and time until the next birthday." },
    { purpose:"Calculate the difference between two dates or add/subtract time from a date.", inputs:["Choose the operation and calendar.","For difference mode, enter two dates.","For date arithmetic, enter a start date, amount, unit, and operation."], result:"You get the exact difference or the calculated final date." }
  ),
  fa: makeGuides(
    { purpose:"برای محاسبه درصد یک عدد، نسبت دو عدد، یا میزان افزایش و کاهش درصدی استفاده می‌شود.", inputs:["ابتدا نوع محاسبه را انتخاب کنید.","در کادر اول مقدار اول را وارد کنید.","در کادر دوم مقدار پایه، کل، یا مقدار جدید را وارد کنید."], result:"نتیجه درصد و در صورت نیاز مقدار افزایش یا کاهش نمایش داده می‌شود." },
    { purpose:"برای محاسبه قیمت بعد از تخفیف و مقدار صرفه‌جویی استفاده می‌شود.", inputs:["قیمت اصلی را وارد کنید.","درصد تخفیف را بین ۰ تا ۱۰۰ وارد کنید.","تعداد کالا را وارد کنید؛ برای یک مورد مقدار ۱ را نگه دارید."], result:"مقدار تخفیف، قیمت نهایی، جمع کل و کل صرفه‌جویی نمایش داده می‌شود." },
    { purpose:"برای تبدیل یک مقدار از یک واحد به واحد دیگر استفاده می‌شود.", inputs:["دسته واحد را انتخاب کنید.","مقداری که می‌خواهید تبدیل شود را وارد کنید.","واحد مبدا و سپس واحد مقصد را انتخاب کنید."], result:"مقدار تبدیل‌شده در واحد مقصد نمایش داده می‌شود." },
    { purpose:"برای محاسبه سن دقیق با تقویم هجری شمسی یا میلادی استفاده می‌شود.", inputs:["نوع تقویم را انتخاب کنید.","تاریخ تولد را وارد کنید یا از تقویم انتخاب کنید.","تاریخ محاسبه را وارد یا انتخاب کنید."], result:"سن دقیق، مجموع روزهای زندگی و زمان باقی‌مانده تا تولد بعدی نمایش داده می‌شود." },
    { purpose:"برای محاسبه فاصله بین دو تاریخ یا افزودن و کم‌کردن زمان از یک تاریخ استفاده می‌شود.", inputs:["نوع عملیات و تقویم را انتخاب کنید.","در حالت فاصله، تاریخ اول و دوم را وارد کنید.","در حالت افزودن/کم‌کردن، تاریخ شروع، مقدار، واحد زمان و عملیات را انتخاب کنید."], result:"فاصله دقیق یا تاریخ نهایی محاسبه‌شده نمایش داده می‌شود." }
  ),
  ar: makeGuides(
    { purpose:"احسب نسبة مئوية من رقم، أو قارن بين قيمتين، أو احسب نسبة الزيادة أو النقصان.", inputs:["اختر نوع الحساب.","أدخل القيمة الأولى.","أدخل القيمة الأساسية أو الإجمالية أو الجديدة في الحقل الثاني."], result:"ستظهر النتيجة المئوية ومقدار الزيادة أو النقصان عند الحاجة." },
    { purpose:"احسب السعر بعد الخصم ومقدار التوفير.", inputs:["أدخل السعر الأصلي.","أدخل نسبة خصم من 0 إلى 100.","أدخل الكمية أو اتركها 1 لعنصر واحد."], result:"ستظهر قيمة الخصم والسعر النهائي والإجمالي وإجمالي التوفير." },
    { purpose:"حوّل قيمة من وحدة إلى أخرى.", inputs:["اختر فئة الوحدات.","أدخل القيمة المراد تحويلها.","اختر وحدة المصدر ووحدة الوجهة."], result:"تظهر القيمة المحوّلة بوحدة الوجهة." },
    { purpose:"احسب العمر الدقيق بالتقويم الهجري الشمسي أو الميلادي.", inputs:["اختر التقويم.","أدخل أو اختر تاريخ الميلاد.","أدخل أو اختر تاريخ الحساب."], result:"ستحصل على العمر الدقيق وإجمالي الأيام والمدة حتى عيد الميلاد القادم." },
    { purpose:"احسب الفرق بين تاريخين أو أضف/اطرح مدة من تاريخ.", inputs:["اختر العملية والتقويم.","في وضع الفرق، أدخل تاريخين.","في حساب التاريخ، أدخل تاريخ البداية والمقدار والوحدة والعملية."], result:"ستحصل على الفرق الدقيق أو التاريخ النهائي المحسوب." }
  ),
  es: makeGuides(
    { purpose:"Calcula un porcentaje de un número, compara dos valores o mide un aumento o disminución porcentual.", inputs:["Elige el tipo de cálculo.","Introduce el primer valor.","Introduce la base, el total o el nuevo valor en el segundo campo."], result:"Obtendrás el porcentaje y, cuando corresponda, el aumento o la disminución." },
    { purpose:"Calcula el precio después de un descuento y cuánto ahorras.", inputs:["Introduce el precio original.","Introduce un descuento de 0 a 100.","Introduce la cantidad o deja 1 para un artículo."], result:"Obtendrás el descuento, el precio final, el total y el ahorro total." },
    { purpose:"Convierte un valor de una unidad a otra.", inputs:["Elige una categoría de unidades.","Introduce la cantidad que deseas convertir.","Elige la unidad de origen y la de destino."], result:"El valor convertido aparecerá en la unidad de destino." },
    { purpose:"Calcula la edad exacta con el calendario Jalali o gregoriano.", inputs:["Elige el calendario.","Introduce o selecciona la fecha de nacimiento.","Introduce o selecciona la fecha de cálculo."], result:"Obtendrás la edad exacta, los días vividos y el tiempo hasta el próximo cumpleaños." },
    { purpose:"Calcula la diferencia entre dos fechas o suma/resta tiempo a una fecha.", inputs:["Elige la operación y el calendario.","Para la diferencia, introduce dos fechas.","Para aritmética de fechas, introduce fecha inicial, cantidad, unidad y operación."], result:"Obtendrás la diferencia exacta o la fecha final calculada." }
  ),
  fr: makeGuides(
    { purpose:"Calculez un pourcentage, comparez deux valeurs ou mesurez une hausse ou une baisse en pourcentage.", inputs:["Choisissez le type de calcul.","Saisissez la première valeur.","Saisissez la base, le total ou la nouvelle valeur dans le second champ."], result:"Vous obtenez le pourcentage et, si nécessaire, le montant de l’augmentation ou de la diminution." },
    { purpose:"Calculez le prix après remise et le montant économisé.", inputs:["Saisissez le prix d’origine.","Saisissez une remise de 0 à 100.","Saisissez la quantité ou laissez 1 pour un article."], result:"Vous obtenez la remise, le prix final, le total et l’économie totale." },
    { purpose:"Convertissez une valeur d’une unité à une autre.", inputs:["Choisissez une catégorie d’unités.","Saisissez la valeur à convertir.","Choisissez l’unité source et l’unité de destination."], result:"La valeur convertie apparaît dans l’unité de destination." },
    { purpose:"Calculez l’âge exact avec le calendrier jalali ou grégorien.", inputs:["Choisissez le calendrier.","Saisissez ou choisissez la date de naissance.","Saisissez ou choisissez la date de calcul."], result:"Vous obtenez l’âge exact, le nombre total de jours vécus et le temps jusqu’au prochain anniversaire." },
    { purpose:"Calculez l’écart entre deux dates ou ajoutez/retirez une durée à une date.", inputs:["Choisissez l’opération et le calendrier.","Pour l’écart, saisissez deux dates.","Pour l’arithmétique des dates, saisissez la date de départ, la valeur, l’unité et l’opération."], result:"Vous obtenez l’écart exact ou la date finale calculée." }
  ),
  de: makeGuides(
    { purpose:"Berechne einen Prozentsatz, vergleiche zwei Werte oder ermittle prozentuale Zu- und Abnahmen.", inputs:["Wähle die Berechnungsart.","Gib den ersten Wert ein.","Gib Basis, Gesamtwert oder neuen Wert in das zweite Feld ein."], result:"Du erhältst das Prozentergebnis und gegebenenfalls den Zu- oder Abnahmebetrag." },
    { purpose:"Berechne den Preis nach Rabatt und deine Ersparnis.", inputs:["Gib den ursprünglichen Preis ein.","Gib einen Rabatt von 0 bis 100 ein.","Gib die Menge ein oder lasse 1 für einen Artikel stehen."], result:"Du erhältst Rabattbetrag, Endpreis, Gesamtbetrag und Gesamtersparnis." },
    { purpose:"Wandle einen Wert von einer Einheit in eine andere um.", inputs:["Wähle eine Einheitenkategorie.","Gib den umzuwandelnden Wert ein.","Wähle Ausgangs- und Zieleinheit."], result:"Der umgerechnete Wert erscheint in der Zieleinheit." },
    { purpose:"Berechne das genaue Alter mit dem Jalali- oder gregorianischen Kalender.", inputs:["Wähle den Kalender.","Gib das Geburtsdatum ein oder wähle es aus.","Gib das Berechnungsdatum ein oder wähle es aus."], result:"Du erhältst das genaue Alter, die Gesamtzahl der gelebten Tage und die Zeit bis zum nächsten Geburtstag." },
    { purpose:"Berechne den Unterschied zwischen zwei Daten oder addiere/subtrahiere Zeit zu einem Datum.", inputs:["Wähle Operation und Kalender.","Für die Differenz gib zwei Daten ein.","Für Datumsarithmetik gib Startdatum, Betrag, Einheit und Operation ein."], result:"Du erhältst die genaue Differenz oder das berechnete Enddatum." }
  ),
  pt: makeGuides(
    { purpose:"Calcule uma porcentagem, compare dois valores ou meça aumento e redução percentuais.", inputs:["Escolha o tipo de cálculo.","Digite o primeiro valor.","Digite a base, o total ou o novo valor no segundo campo."], result:"Você recebe o resultado percentual e, quando necessário, o valor do aumento ou da redução." },
    { purpose:"Calcule o preço após o desconto e quanto você economiza.", inputs:["Digite o preço original.","Digite um desconto de 0 a 100.","Digite a quantidade ou mantenha 1 para um item."], result:"Você recebe o desconto, preço final, total e economia total." },
    { purpose:"Converta um valor de uma unidade para outra.", inputs:["Escolha uma categoria de unidades.","Digite o valor a converter.","Escolha a unidade de origem e a de destino."], result:"O valor convertido aparece na unidade de destino." },
    { purpose:"Calcule a idade exata usando o calendário Jalali ou gregoriano.", inputs:["Escolha o calendário.","Digite ou selecione a data de nascimento.","Digite ou selecione a data de cálculo."], result:"Você recebe a idade exata, o total de dias vividos e o tempo até o próximo aniversário." },
    { purpose:"Calcule a diferença entre duas datas ou adicione/subtraia tempo de uma data.", inputs:["Escolha a operação e o calendário.","No modo diferença, informe duas datas.","Na aritmética de datas, informe data inicial, valor, unidade e operação."], result:"Você recebe a diferença exata ou a data final calculada." }
  ),
  ru: makeGuides(
    { purpose:"Рассчитайте процент от числа, сравните два значения или определите процентное увеличение или уменьшение.", inputs:["Выберите тип расчёта.","Введите первое значение.","Введите базовое, общее или новое значение во второе поле."], result:"Вы получите процентный результат и при необходимости величину увеличения или уменьшения." },
    { purpose:"Рассчитайте цену после скидки и сумму экономии.", inputs:["Введите исходную цену.","Введите скидку от 0 до 100.","Введите количество или оставьте 1 для одного товара."], result:"Вы получите сумму скидки, итоговую цену, общую сумму и общую экономию." },
    { purpose:"Преобразуйте значение из одной единицы в другую.", inputs:["Выберите категорию единиц.","Введите значение для преобразования.","Выберите исходную и целевую единицы."], result:"Преобразованное значение появится в целевой единице." },
    { purpose:"Рассчитайте точный возраст по календарю Джалали или григорианскому календарю.", inputs:["Выберите календарь.","Введите или выберите дату рождения.","Введите или выберите дату расчёта."], result:"Вы получите точный возраст, общее число прожитых дней и время до следующего дня рождения." },
    { purpose:"Рассчитайте разницу между двумя датами или прибавьте/вычтите время из даты.", inputs:["Выберите операцию и календарь.","Для режима разницы введите две даты.","Для арифметики дат введите начальную дату, значение, единицу и операцию."], result:"Вы получите точную разницу или рассчитанную конечную дату." }
  ),
  zh: makeGuides(
    { purpose:"计算一个数的百分比、比较两个数值，或计算百分比增加和减少。", inputs:["选择计算类型。","输入第一个数值。","在第二个字段中输入基数、总数或新数值。"], result:"你将得到百分比结果，并在适用时看到增加或减少的数值。" },
    { purpose:"计算折扣后的价格以及节省金额。", inputs:["输入原价。","输入 0 到 100 的折扣百分比。","输入数量；单件商品保持为 1。"], result:"你将得到折扣金额、最终价格、总价和总节省金额。" },
    { purpose:"将一个单位的数值转换为另一个单位。", inputs:["选择单位类别。","输入要转换的数值。","选择来源单位和目标单位。"], result:"转换后的数值会以目标单位显示。" },
    { purpose:"使用贾拉里历或公历计算准确年龄。", inputs:["选择日历。","输入或选择出生日期。","输入或选择计算日期。"], result:"你将得到准确年龄、总生活天数以及距离下次生日的时间。" },
    { purpose:"计算两个日期之间的差值，或在日期上加减时间。", inputs:["选择操作和日历。","在日期差模式下输入两个日期。","在日期运算模式下输入开始日期、数值、单位和操作。"], result:"你将得到准确日期差或计算后的最终日期。" }
  ),
  ja: makeGuides(
    { purpose:"数値の割合、2つの値の比較、割合の増減を計算します。", inputs:["計算タイプを選択します。","最初の値を入力します。","2番目の欄に基準値、合計値、または新しい値を入力します。"], result:"割合の結果と、必要に応じて増加量または減少量が表示されます。" },
    { purpose:"割引後の価格と節約額を計算します。", inputs:["元の価格を入力します。","0〜100の割引率を入力します。","数量を入力します。1個の場合は1のままにします。"], result:"割引額、最終価格、合計、総節約額が表示されます。" },
    { purpose:"値をある単位から別の単位へ変換します。", inputs:["単位カテゴリを選択します。","変換する値を入力します。","変換元と変換先の単位を選択します。"], result:"変換後の値が変換先の単位で表示されます。" },
    { purpose:"ジャラーリー暦またはグレゴリオ暦で正確な年齢を計算します。", inputs:["暦を選択します。","生年月日を入力または選択します。","計算日を入力または選択します。"], result:"正確な年齢、生きた総日数、次の誕生日までの日数が表示されます。" },
    { purpose:"2つの日付の差を計算したり、日付に時間を加減したりします。", inputs:["操作と暦を選択します。","差分モードでは2つの日付を入力します。","日付計算では開始日、値、単位、操作を入力します。"], result:"正確な差または計算後の日付が表示されます。" }
  ),
  hi: makeGuides(
    { purpose:"किसी संख्या का प्रतिशत, दो मानों की तुलना, या प्रतिशत बढ़ोतरी/कमी की गणना करें।", inputs:["गणना का प्रकार चुनें।","पहला मान दर्ज करें।","दूसरे फ़ील्ड में आधार, कुल या नया मान दर्ज करें।"], result:"आपको प्रतिशत परिणाम और आवश्यक होने पर बढ़ोतरी या कमी की मात्रा मिलेगी।" },
    { purpose:"छूट के बाद की कीमत और बचत की राशि निकालें।", inputs:["मूल कीमत दर्ज करें।","0 से 100 तक छूट दर्ज करें।","मात्रा दर्ज करें या एक वस्तु के लिए 1 रखें।"], result:"आपको छूट राशि, अंतिम कीमत, कुल और कुल बचत मिलेगी।" },
    { purpose:"एक इकाई से दूसरी इकाई में मान बदलें।", inputs:["इकाई श्रेणी चुनें।","बदलने वाली मात्रा दर्ज करें।","स्रोत और गंतव्य इकाई चुनें।"], result:"परिवर्तित मान गंतव्य इकाई में दिखाई देगा।" },
    { purpose:"जलाली या ग्रेगोरियन कैलेंडर से सटीक आयु निकालें।", inputs:["कैलेंडर चुनें।","जन्म तिथि दर्ज करें या चुनें।","गणना की तिथि दर्ज करें या चुनें।"], result:"आपको सटीक आयु, कुल जीवित दिन और अगले जन्मदिन तक का समय मिलेगा।" },
    { purpose:"दो तिथियों का अंतर निकालें या किसी तिथि में समय जोड़ें/घटाएँ।", inputs:["ऑपरेशन और कैलेंडर चुनें।","अंतर मोड में दो तिथियाँ दर्ज करें।","तिथि गणना में प्रारंभ तिथि, मात्रा, इकाई और ऑपरेशन दर्ज करें।"], result:"आपको सटीक अंतर या अंतिम गणना की गई तिथि मिलेगी।" }
  ),
  ur: makeGuides(
    { purpose:"کسی عدد کا فیصد، دو قدروں کا موازنہ، یا فیصدی اضافہ اور کمی معلوم کریں۔", inputs:["حساب کی قسم منتخب کریں۔","پہلی قدر درج کریں۔","دوسرے خانے میں بنیادی، کل یا نئی قدر درج کریں۔"], result:"آپ کو فیصدی نتیجہ اور ضرورت کے مطابق اضافہ یا کمی کی مقدار ملے گی۔" },
    { purpose:"رعایت کے بعد قیمت اور بچت کی مقدار معلوم کریں۔", inputs:["اصل قیمت درج کریں۔","0 سے 100 تک رعایت درج کریں۔","مقدار درج کریں یا ایک چیز کے لیے 1 رہنے دیں۔"], result:"آپ کو رعایت، آخری قیمت، کل رقم اور کل بچت ملے گی۔" },
    { purpose:"ایک اکائی کی قدر کو دوسری اکائی میں تبدیل کریں۔", inputs:["اکائی کی قسم منتخب کریں۔","تبدیل کرنے والی مقدار درج کریں۔","ابتدائی اور مطلوبہ اکائی منتخب کریں۔"], result:"تبدیل شدہ قدر مطلوبہ اکائی میں دکھائی جائے گی۔" },
    { purpose:"شمسی یا گریگورین کیلنڈر سے درست عمر معلوم کریں۔", inputs:["کیلنڈر منتخب کریں۔","تاریخ پیدائش درج کریں یا منتخب کریں۔","حساب کی تاریخ درج کریں یا منتخب کریں۔"], result:"آپ کو درست عمر، کل زندہ دن اور اگلی سالگرہ تک کا وقت ملے گا۔" },
    { purpose:"دو تاریخوں کے درمیان فرق معلوم کریں یا کسی تاریخ میں وقت جمع/منفی کریں۔", inputs:["عمل اور کیلنڈر منتخب کریں۔","فرق کے موڈ میں دو تاریخیں درج کریں۔","تاریخی حساب میں ابتدائی تاریخ، مقدار، اکائی اور عمل درج کریں۔"], result:"آپ کو درست فرق یا حساب شدہ آخری تاریخ ملے گی۔" }
  ),
  tr: makeGuides(
    { purpose:"Bir sayının yüzdesini, iki değerin karşılaştırmasını veya yüzde artış/azalışını hesaplayın.", inputs:["Hesaplama türünü seçin.","İlk değeri girin.","İkinci alana temel, toplam veya yeni değeri girin."], result:"Yüzde sonucunu ve gerektiğinde artış veya azalış miktarını görürsünüz." },
    { purpose:"İndirim sonrası fiyatı ve ne kadar tasarruf ettiğinizi hesaplayın.", inputs:["Orijinal fiyatı girin.","0 ile 100 arasında indirim girin.","Adedi girin veya tek ürün için 1 bırakın."], result:"İndirim tutarı, son fiyat, toplam ve toplam tasarrufu görürsünüz." },
    { purpose:"Bir değeri bir birimden başka bir birime dönüştürün.", inputs:["Birim kategorisini seçin.","Dönüştürülecek değeri girin.","Kaynak ve hedef birimi seçin."], result:"Dönüştürülen değer hedef birimde gösterilir." },
    { purpose:"Celali veya Gregoryen takvimle tam yaşı hesaplayın.", inputs:["Takvimi seçin.","Doğum tarihini girin veya seçin.","Hesaplama tarihini girin veya seçin."], result:"Tam yaş, toplam yaşanan gün ve sonraki doğum gününe kalan süre gösterilir." },
    { purpose:"İki tarih arasındaki farkı hesaplayın veya bir tarihe süre ekleyip çıkarın.", inputs:["İşlemi ve takvimi seçin.","Fark modunda iki tarih girin.","Tarih işleminde başlangıç tarihi, miktar, birim ve işlemi girin."], result:"Tam fark veya hesaplanan son tarih gösterilir." }
  ),
  it: makeGuides(
    { purpose:"Calcola una percentuale, confronta due valori o misura aumento e diminuzione percentuale.", inputs:["Scegli il tipo di calcolo.","Inserisci il primo valore.","Inserisci base, totale o nuovo valore nel secondo campo."], result:"Ottieni il risultato percentuale e, quando serve, l’aumento o la diminuzione." },
    { purpose:"Calcola il prezzo dopo lo sconto e quanto risparmi.", inputs:["Inserisci il prezzo originale.","Inserisci uno sconto da 0 a 100.","Inserisci la quantità o lascia 1 per un articolo."], result:"Ottieni importo dello sconto, prezzo finale, totale e risparmio complessivo." },
    { purpose:"Converti un valore da un’unità a un’altra.", inputs:["Scegli una categoria di unità.","Inserisci il valore da convertire.","Scegli l’unità di origine e quella di destinazione."], result:"Il valore convertito appare nell’unità di destinazione." },
    { purpose:"Calcola l’età esatta con calendario Jalali o gregoriano.", inputs:["Scegli il calendario.","Inserisci o seleziona la data di nascita.","Inserisci o seleziona la data di calcolo."], result:"Ottieni l’età esatta, i giorni totali vissuti e il tempo fino al prossimo compleanno." },
    { purpose:"Calcola la differenza tra due date o aggiungi/sottrai tempo a una data.", inputs:["Scegli operazione e calendario.","Per la differenza, inserisci due date.","Per l’aritmetica delle date, inserisci data iniziale, quantità, unità e operazione."], result:"Ottieni la differenza esatta o la data finale calcolata." }
  ),
  id: makeGuides(
    { purpose:"Hitung persentase dari angka, bandingkan dua nilai, atau ukur kenaikan dan penurunan persentase.", inputs:["Pilih jenis perhitungan.","Masukkan nilai pertama.","Masukkan nilai dasar, total, atau nilai baru pada kolom kedua."], result:"Anda mendapatkan hasil persentase dan, bila relevan, jumlah kenaikan atau penurunan." },
    { purpose:"Hitung harga setelah diskon dan jumlah penghematan.", inputs:["Masukkan harga awal.","Masukkan diskon dari 0 sampai 100.","Masukkan jumlah barang atau biarkan 1 untuk satu barang."], result:"Anda mendapatkan nilai diskon, harga akhir, total, dan total penghematan." },
    { purpose:"Konversi nilai dari satu satuan ke satuan lain.", inputs:["Pilih kategori satuan.","Masukkan nilai yang akan dikonversi.","Pilih satuan asal dan tujuan."], result:"Nilai hasil konversi muncul dalam satuan tujuan." },
    { purpose:"Hitung usia tepat dengan kalender Jalali atau Gregorian.", inputs:["Pilih kalender.","Masukkan atau pilih tanggal lahir.","Masukkan atau pilih tanggal perhitungan."], result:"Anda mendapatkan usia tepat, total hari hidup, dan waktu hingga ulang tahun berikutnya." },
    { purpose:"Hitung selisih dua tanggal atau tambah/kurangi waktu dari suatu tanggal.", inputs:["Pilih operasi dan kalender.","Untuk mode selisih, masukkan dua tanggal.","Untuk aritmetika tanggal, masukkan tanggal awal, jumlah, satuan, dan operasi."], result:"Anda mendapatkan selisih tepat atau tanggal akhir hasil perhitungan." }
  ),
  vi: makeGuides(
    { purpose:"Tính phần trăm của một số, so sánh hai giá trị hoặc đo mức tăng/giảm theo phần trăm.", inputs:["Chọn loại phép tính.","Nhập giá trị đầu tiên.","Nhập giá trị cơ sở, tổng hoặc giá trị mới vào ô thứ hai."], result:"Bạn nhận được kết quả phần trăm và khi cần, mức tăng hoặc giảm." },
    { purpose:"Tính giá sau khi giảm và số tiền bạn tiết kiệm.", inputs:["Nhập giá gốc.","Nhập mức giảm từ 0 đến 100.","Nhập số lượng hoặc giữ 1 cho một mặt hàng."], result:"Bạn nhận được số tiền giảm, giá cuối, tổng và tổng tiền tiết kiệm." },
    { purpose:"Chuyển đổi một giá trị từ đơn vị này sang đơn vị khác.", inputs:["Chọn nhóm đơn vị.","Nhập giá trị cần đổi.","Chọn đơn vị nguồn và đơn vị đích."], result:"Giá trị đã chuyển đổi sẽ xuất hiện theo đơn vị đích." },
    { purpose:"Tính tuổi chính xác bằng lịch Jalali hoặc Gregory.", inputs:["Chọn lịch.","Nhập hoặc chọn ngày sinh.","Nhập hoặc chọn ngày tính."], result:"Bạn nhận được tuổi chính xác, tổng số ngày đã sống và thời gian đến sinh nhật tiếp theo." },
    { purpose:"Tính khoảng cách giữa hai ngày hoặc cộng/trừ thời gian vào một ngày.", inputs:["Chọn phép tính và lịch.","Ở chế độ chênh lệch, nhập hai ngày.","Ở phép tính ngày, nhập ngày bắt đầu, số lượng, đơn vị và phép tính."], result:"Bạn nhận được chênh lệch chính xác hoặc ngày cuối đã tính." }
  ),
  nl: makeGuides(
    { purpose:"Bereken een percentage, vergelijk twee waarden of meet procentuele stijging en daling.", inputs:["Kies het type berekening.","Voer de eerste waarde in.","Voer de basis, het totaal of de nieuwe waarde in het tweede veld in."], result:"Je krijgt het percentage en indien van toepassing de stijging of daling." },
    { purpose:"Bereken de prijs na korting en hoeveel je bespaart.", inputs:["Voer de oorspronkelijke prijs in.","Voer een korting van 0 tot 100 in.","Voer het aantal in of laat 1 staan voor één artikel."], result:"Je krijgt het kortingsbedrag, de eindprijs, het totaal en de totale besparing." },
    { purpose:"Zet een waarde om van de ene eenheid naar de andere.", inputs:["Kies een categorie.","Voer de waarde in die je wilt omrekenen.","Kies de bron- en doeleenheid."], result:"De omgerekende waarde verschijnt in de doeleenheid." },
    { purpose:"Bereken de exacte leeftijd met de Jalali- of Gregoriaanse kalender.", inputs:["Kies de kalender.","Voer de geboortedatum in of selecteer deze.","Voer de berekeningsdatum in of selecteer deze."], result:"Je krijgt de exacte leeftijd, het totaal aantal geleefde dagen en de tijd tot de volgende verjaardag." },
    { purpose:"Bereken het verschil tussen twee datums of tel tijd bij een datum op of trek die ervan af.", inputs:["Kies de bewerking en kalender.","Voer in verschilmodus twee datums in.","Voer voor datumberekening startdatum, hoeveelheid, eenheid en bewerking in."], result:"Je krijgt het exacte verschil of de berekende einddatum." }
  ),
  pl: makeGuides(
    { purpose:"Oblicz procent liczby, porównaj dwie wartości lub zmierz procentowy wzrost i spadek.", inputs:["Wybierz typ obliczenia.","Wpisz pierwszą wartość.","W drugim polu wpisz wartość bazową, całkowitą lub nową."], result:"Otrzymasz wynik procentowy oraz, jeśli dotyczy, wartość wzrostu lub spadku." },
    { purpose:"Oblicz cenę po rabacie i kwotę oszczędności.", inputs:["Wpisz cenę początkową.","Wpisz rabat od 0 do 100.","Wpisz ilość lub pozostaw 1 dla jednej sztuki."], result:"Otrzymasz kwotę rabatu, cenę końcową, sumę i łączne oszczędności." },
    { purpose:"Przelicz wartość z jednej jednostki na inną.", inputs:["Wybierz kategorię jednostek.","Wpisz wartość do przeliczenia.","Wybierz jednostkę źródłową i docelową."], result:"Przeliczona wartość pojawi się w jednostce docelowej." },
    { purpose:"Oblicz dokładny wiek według kalendarza Jalali lub gregoriańskiego.", inputs:["Wybierz kalendarz.","Wpisz lub wybierz datę urodzenia.","Wpisz lub wybierz datę obliczenia."], result:"Otrzymasz dokładny wiek, łączną liczbę przeżytych dni i czas do kolejnych urodzin." },
    { purpose:"Oblicz różnicę między dwiema datami lub dodaj/odejmij czas od daty.", inputs:["Wybierz operację i kalendarz.","W trybie różnicy wpisz dwie daty.","Dla obliczeń dat wpisz datę początkową, wartość, jednostkę i operację."], result:"Otrzymasz dokładną różnicę lub obliczoną datę końcową." }
  ),
  ro: makeGuides(
    { purpose:"Calculează un procent, compară două valori sau măsoară creșterea și scăderea procentuală.", inputs:["Alege tipul de calcul.","Introdu prima valoare.","Introdu valoarea de bază, totalul sau valoarea nouă în al doilea câmp."], result:"Primești rezultatul procentual și, când este cazul, valoarea creșterii sau scăderii." },
    { purpose:"Calculează prețul după reducere și cât economisești.", inputs:["Introdu prețul inițial.","Introdu o reducere de la 0 la 100.","Introdu cantitatea sau păstrează 1 pentru un articol."], result:"Primești valoarea reducerii, prețul final, totalul și economia totală." },
    { purpose:"Convertește o valoare dintr-o unitate în alta.", inputs:["Alege o categorie de unități.","Introdu valoarea de convertit.","Alege unitatea sursă și unitatea destinație."], result:"Valoarea convertită apare în unitatea destinație." },
    { purpose:"Calculează vârsta exactă folosind calendarul Jalali sau gregorian.", inputs:["Alege calendarul.","Introdu sau selectează data nașterii.","Introdu sau selectează data calculului."], result:"Primești vârsta exactă, totalul zilelor trăite și timpul până la următoarea aniversare." },
    { purpose:"Calculează diferența dintre două date sau adaugă/scade timp dintr-o dată.", inputs:["Alege operația și calendarul.","Pentru diferență, introdu două date.","Pentru aritmetica datelor, introdu data de început, valoarea, unitatea și operația."], result:"Primești diferența exactă sau data finală calculată." }
  ),
  sv: makeGuides(
    { purpose:"Beräkna en procentandel, jämför två värden eller mät procentuell ökning och minskning.", inputs:["Välj beräkningstyp.","Ange det första värdet.","Ange basvärdet, totalen eller det nya värdet i det andra fältet."], result:"Du får procentresultatet och vid behov ökningen eller minskningen." },
    { purpose:"Beräkna priset efter rabatt och hur mycket du sparar.", inputs:["Ange ordinarie pris.","Ange en rabatt från 0 till 100.","Ange antal eller behåll 1 för en vara."], result:"Du får rabattbelopp, slutpris, totalsumma och total besparing." },
    { purpose:"Konvertera ett värde från en enhet till en annan.", inputs:["Välj en enhetskategori.","Ange värdet som ska konverteras.","Välj käll- och målenhet."], result:"Det konverterade värdet visas i målenheten." },
    { purpose:"Beräkna exakt ålder med Jalali- eller gregoriansk kalender.", inputs:["Välj kalender.","Ange eller välj födelsedatum.","Ange eller välj beräkningsdatum."], result:"Du får exakt ålder, totalt antal levda dagar och tiden till nästa födelsedag." },
    { purpose:"Beräkna skillnaden mellan två datum eller lägg till/dra ifrån tid från ett datum.", inputs:["Välj operation och kalender.","I skillnadsläge anger du två datum.","För datumaritmetik anger du startdatum, mängd, enhet och operation."], result:"Du får den exakta skillnaden eller det beräknade slutdatumet." }
  )
};

const labels: Record<AppLanguage, ToolGuideLabels> = {
  en:{title:"How to use",inputs:"What to enter",result:"What you get",toggleTitle:"Tool guide",visible:"Guide is visible",hidden:"Enable to see instructions",accessibility:"Show tool guide"},
  fa:{title:"راهنمای استفاده",inputs:"چه چیزی وارد کنید",result:"چه نتیجه‌ای می‌گیرید",toggleTitle:"راهنمای این ابزار",visible:"راهنما نمایش داده می‌شود",hidden:"برای دیدن توضیحات این ابزار فعال کنید",accessibility:"نمایش راهنمای این ابزار"},
  ar:{title:"كيفية الاستخدام",inputs:"ما الذي يجب إدخاله",result:"ما الذي ستحصل عليه",toggleTitle:"دليل الأداة",visible:"الدليل ظاهر",hidden:"فعّل لعرض التعليمات",accessibility:"عرض دليل الأداة"},
  es:{title:"Cómo usar",inputs:"Qué introducir",result:"Qué obtienes",toggleTitle:"Guía de la herramienta",visible:"La guía está visible",hidden:"Activa para ver las instrucciones",accessibility:"Mostrar guía de la herramienta"},
  fr:{title:"Mode d’emploi",inputs:"Que saisir",result:"Ce que vous obtenez",toggleTitle:"Guide de l’outil",visible:"Le guide est visible",hidden:"Activez pour voir les instructions",accessibility:"Afficher le guide de l’outil"},
  de:{title:"So funktioniert es",inputs:"Was eingeben",result:"Was du erhältst",toggleTitle:"Werkzeughilfe",visible:"Hilfe ist sichtbar",hidden:"Aktivieren, um Anweisungen zu sehen",accessibility:"Werkzeughilfe anzeigen"},
  pt:{title:"Como usar",inputs:"O que inserir",result:"O que você obtém",toggleTitle:"Guia da ferramenta",visible:"O guia está visível",hidden:"Ative para ver as instruções",accessibility:"Mostrar guia da ferramenta"},
  ru:{title:"Как использовать",inputs:"Что ввести",result:"Что вы получите",toggleTitle:"Справка по инструменту",visible:"Инструкция отображается",hidden:"Включите, чтобы увидеть инструкции",accessibility:"Показать справку по инструменту"},
  zh:{title:"使用方法",inputs:"需要输入什么",result:"你将得到什么",toggleTitle:"工具指南",visible:"指南已显示",hidden:"启用以查看说明",accessibility:"显示工具指南"},
  ja:{title:"使い方",inputs:"入力する内容",result:"得られる結果",toggleTitle:"ツールガイド",visible:"ガイドを表示中",hidden:"有効にすると説明が表示されます",accessibility:"ツールガイドを表示"},
  hi:{title:"कैसे उपयोग करें",inputs:"क्या दर्ज करें",result:"क्या मिलेगा",toggleTitle:"टूल गाइड",visible:"गाइड दिखाई दे रही है",hidden:"निर्देश देखने के लिए सक्षम करें",accessibility:"टूल गाइड दिखाएँ"},
  ur:{title:"استعمال کا طریقہ",inputs:"کیا درج کریں",result:"آپ کو کیا ملے گا",toggleTitle:"ٹول گائیڈ",visible:"گائیڈ دکھائی جا رہی ہے",hidden:"ہدایات دیکھنے کے لیے فعال کریں",accessibility:"ٹول گائیڈ دکھائیں"},
  tr:{title:"Nasıl kullanılır",inputs:"Ne girilmeli",result:"Ne elde edersiniz",toggleTitle:"Araç rehberi",visible:"Rehber görünür",hidden:"Talimatları görmek için etkinleştirin",accessibility:"Araç rehberini göster"},
  it:{title:"Come si usa",inputs:"Cosa inserire",result:"Cosa ottieni",toggleTitle:"Guida dello strumento",visible:"La guida è visibile",hidden:"Attiva per vedere le istruzioni",accessibility:"Mostra guida dello strumento"},
  id:{title:"Cara menggunakan",inputs:"Yang harus dimasukkan",result:"Hasil yang didapat",toggleTitle:"Panduan alat",visible:"Panduan terlihat",hidden:"Aktifkan untuk melihat petunjuk",accessibility:"Tampilkan panduan alat"},
  vi:{title:"Cách sử dụng",inputs:"Cần nhập gì",result:"Bạn nhận được gì",toggleTitle:"Hướng dẫn công cụ",visible:"Hướng dẫn đang hiển thị",hidden:"Bật để xem hướng dẫn",accessibility:"Hiển thị hướng dẫn công cụ"},
  nl:{title:"Zo gebruik je het",inputs:"Wat invoeren",result:"Wat je krijgt",toggleTitle:"Hulpgids",visible:"De gids is zichtbaar",hidden:"Schakel in om instructies te zien",accessibility:"Hulpgids tonen"},
  pl:{title:"Jak używać",inputs:"Co wpisać",result:"Co otrzymasz",toggleTitle:"Przewodnik narzędzia",visible:"Przewodnik jest widoczny",hidden:"Włącz, aby zobaczyć instrukcje",accessibility:"Pokaż przewodnik narzędzia"},
  ro:{title:"Cum se folosește",inputs:"Ce să introduci",result:"Ce obții",toggleTitle:"Ghidul instrumentului",visible:"Ghidul este vizibil",hidden:"Activează pentru a vedea instrucțiunile",accessibility:"Afișează ghidul instrumentului"},
  sv:{title:"Så använder du det",inputs:"Vad du ska ange",result:"Vad du får",toggleTitle:"Verktygsguide",visible:"Guiden visas",hidden:"Aktivera för att se instruktioner",accessibility:"Visa verktygsguide"}
};

export function toolGuidance(language: AppLanguage, id: ToolGuideId): ToolGuide {
  return guides[language][id];
}

export function toolGuideLabels(language: AppLanguage): ToolGuideLabels {
  return labels[language];
}
