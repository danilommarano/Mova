# Mova

## Componentes

1. Canvas
- Representa a imagem SVG carregada
- Analiza cliques do usuário em qualquer elemento da imagem
2. SVGAnimator
- Adiciona novas animações ao último elemento clicado
3. TImeline
- Lista de animações organizadas numa série temporal
4. SVGStructure
- Lista a estrutura dos elementos do arquivo SVG
5. SVGUploader
- Botão para subir uma imagem para a plataforma
6. SVGDownloader
- Botão para baixar o documento SVG gerado

## Atributos de Animação SVG
### Core:
Os principais atributos são aqueles atributos que podem ser especificados em qualquer elemento SVG
- id
    - Descrição: Atributo XML padrão para atribuir um nome exclusivo a um elemento
- xml:base
    - Descrição: Especifica uma IRI base diferente da base base do documento ou entidade externa
- xml:lang
    - Descrição: Atributo XML padrão para especificar o idioma (por exemplo, inglês) usado nos valores de conteúdo e atributo de elementos específicos
- xml:space - 'default', 'preserve'
    - Descrição: Atributo XML padrão para especificar se o espaço branco é preservado nos dados do caractere

### xlink
Os atributos XLink são os sete atributos definidos na especificação de linguagem de vinculação XML [xlink],
que são usados em vários elementos SVG que podem referir recursos
- xlink:href
- xlink:show
- xlink:actuate
- xlink:type
- xlink:role
- xlink:arcrole
- xlink:title

### animation attribute target
Os atributos a seguir são os atributos do atributo de animação, que identificam o atributo ou propriedade de destino para o elemento de destino especificado cujo valor muda ao longo do tempo.
- attributeType - 'CSS', 'XML', 'auto'
    - Description: Specifies the namespace in which the target attribute and its associated values are defined.
- attributeName - 
    - Descrição: Especifica o nome do atributo de destino.Um prefixo XMLNS pode ser usado para indicar o espaço de nome XML para o atributo

### animation timing
Eles são comuns a todos os elementos de animação e controlam o momento da animação, incluindo o que faz com que a animação inicie e termine, se a animação é executada repetidamente e se deve manter o estado final a animação quando a animação terminar.
- begin
    - Descrição: define quando o elemento deve começar.
- dur - Clock-value | "media" | "indefinite"
    - Descrição: Especifica a duração simples.
- end
    - Descrição: define um valor final para a animação que pode restringir a duração ativa.
- min - Clock-value | "media"
    - Descrição: Especifica o valor mínimo da duração ativa.
- max - Clock-value | "media"
   - Descrição: Especifica o valor máximo da duração ativa.
- restart - "always" | "whenNotActive" | "never"

- repeatCount - numeric value | "indefinite"
    - Descrição: Especifica o número de iterações da função de animação.
- repeatDur - Clock-value | "indefinite"
    - Descrição: Especifica a duração total para repetir.Pode ter os seguintes valores de atributo.
- fill - "freeze" | "remove"
    - Descrição: Este atributo pode ter os seguintes valores:.

### animation value
Eles são comuns aos elementos "animados", "animatecolor", "animatemotion" e "animateTransform".
Esses atributos definem os valores atribuídos ao atributo ou propriedade de destino ao longo do tempo.
Os atributos abaixo fornecem controle sobre o tempo relativo dos quadros -chave e o método de interpolação entre valores discretos.
- calcMode - "discrete | linear | paced | spline"
    - Descrição: Especifica o modo de interpolação para a animação.
- values -  "<list>"
    - Descrição: Uma lista separada por semicolon de um ou mais valores.
- keyTimes -  "<list>"
    - Descrição: Uma lista separada por semicolon de valores de tempo usados para controlar o ritmo da animação.
- keySplines - "<list>"
    - Descrição: Um conjunto de pontos de controle de Bézier associados à lista de 'tempos de chave', definindo uma função bézier cúbica que controla a estimulação do intervalo.
- from - "<value>"
    - Descrição: Especifica o valor inicial da animação.
- to - "<value>"
    - Descrição: Especifica o valor final da animação.
- by - "<value>"
    - Descrição: Pecifica um valor de deslocamento relativo para a animação.

### animation addition
É frequentemente útil definir a animação como um deslocamento ou delta para o valor de um atributo, e não como valores absolutos.
- additive - "replace | sum"
    - Descrição: controla se a animação é ou não aditiva.
- accumulate - "none | sum"
    - Descrição: controla se a animação é cumulativa ou não.
